const Connect = (<any>window).uportconnect;
export const uport = new Connect("Persol Client", {
  network: "rinkeby",
});


// Configure uPort like this:
// import { Connect, SimpleSigner } from 'uport-connect'
// const uport = new Connect('YOUR APP NAME', {
//   clientId: 'YOUR APPLICATION ID FROM APP MANAGER',
//   signer: SimpleSigner('YOUR SIGNING KEY FROM APP MANAGER')
// })