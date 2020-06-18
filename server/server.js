const express = require("express");
const ngrok = require("ngrok");
var cors = require("cors");
const bodyParser = require("body-parser");
const decodeJWT = require("did-jwt").decodeJWT;
const { Credentials } = require("uport-credentials");
const transports = require("uport-transports").transport;
const message = require("uport-transports").message.util;

const Resolver = require("did-resolver").Resolver;
const getResolver = require("ethr-did-resolver").getResolver;

// https://zellwk.com/blog/crud-express-mongodb/
const MongoClient = require("mongodb").MongoClient;
// mongodb atlas
const ConnectString = "mongodb+srv://min:Aa7059970599@cluster0-eosoe.mongodb.net/test?retryWrites=true&w=majority";

let endpoint = "";
const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

// my infura rinkby network url
const providerConfig = { rpcUrl: "https://rinkeby.infura.io/v3/18c0c6beb5764a6fbd1e8a71ec841e8a" };
const resolver = new Resolver(getResolver(providerConfig));

// const { did, privateKey } = Credentials.createIdentity();
const did = "did:ethr:0x30093f55b7b3c3fcfd91bb1796d182d85e3956b2";
const privateKey = "de952f73b38891e1e864aeeaa0a4d9bc41ceb68a8ce85c0b478e3fac900ecb6a";
const appName = "Persol DID";

const credentials = new Credentials({
	appName: appName,
	did: did,
	privateKey: privateKey,
	resolver,
});

MongoClient.connect(ConnectString, {
	useUnifiedTopology: true,
})
	.then((client) => {
		console.log("Connected to Database");
		const db = client.db("persol");
		const seven = db.collection("seven");

		app.get("/", (req, res) => {
			res.send("alive");
		});

		app.get("/info", (req, res) => {
			seven
				.find()
				.toArray()
				.then((results) => {
					// res.charset = "utf-8";
					// res.contentType("text/html");
					// res.write(`<div><b>ユーザー情報</b></div><div>${JSON.stringify(results)}</div>`);
					res.send({ results });
				})
				.catch((error) => console.error(error));
		});

		app.get("/verify", (req, res) => {
			credentials
				.createDisclosureRequest({
					verified: ["SevenEleven"],
					notifications: true,
					callbackUrl: endpoint + "/verify_callback",
					vc: ["/ipfs/QmS8FzLqCRjERe5rpwLkNqbGBvFfqkuGcQryFyj8854Gkz"],
				})
				.then((requestToken) => {
					console.log(decodeJWT(requestToken)); //log request token to console
					const uri = message.paramsToQueryString(message.messageToURI(requestToken), { callback_type: "post" });
					const qr = transports.ui.getImageDataURI(uri);
					// res.charset = "utf-8";
					// res.contentType("text/html");
					// res.write(`<div><b>7店側Demo</b></div><div><img src="${qr}"/></div>`);
					// res.end();

					res.send({ qr });
				});
		});

		app.post("/verify_callback", (req, res) => {
			const jwt = req.body.access_token;
			console.log(req.body);
			// authenticateDisclosureResponse which will verify the signature of the response payload
			// and the signatures of credentials included in the response
			credentials
				.authenticateDisclosureResponse(jwt)
				.then((credentials) => {
					console.log("credentials in callback is");
					console.log(credentials);

					// insert into db
					seven
						.insertOne(credentials)
						.then((result) => {
							console.log(result);
						})
						.catch((error) => console.error(error));
				})
				.catch((err) => {
					console.log(err);
				});
		});

		const server = app.listen(8088, () => {
			ngrok
				.connect({
					proto: "http",
					subdomain: "persol",
					addr: 8088,
				})
				.then((ngrokUrl) => {
					endpoint = ngrokUrl;
					console.log(`Login Service running, open at ${endpoint}`);
				});
		});
	})
	.catch((error) => console.error(error));
