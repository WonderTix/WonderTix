FROM node:18-alpine

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY ./package*.json .

RUN openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout key.pem -out cert.pem -subj "/C=US/ST=OR/L=Portland/O=WonderTix/CN=Wondertix Localhost"

RUN npm install
