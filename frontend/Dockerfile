# frontend/Dockerfile.production
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN chmod -R 755 /app/node_modules/@vue/cli-service/bin

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
