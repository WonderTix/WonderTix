FROM node:18-alpine

WORKDIR /wondertix
COPY ./package*.json .

RUN chown -R 1000:1000 /wondertix

USER 1000:1000

RUN npm install --force
