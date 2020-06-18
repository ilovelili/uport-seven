# Stage 0, compile angular
FROM tiangolo/node-frontend:10 as builder

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build -- --outputPath=./dist/out

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=builder /app/dist/out/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf