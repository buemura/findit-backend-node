FROM node:latest
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

COPY .sequelizerc .
COPY .env.test .

EXPOSE 4000

CMD node src/server.js