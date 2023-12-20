FROM node:18-alpine AS build
WORKDIR /usr/app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

FROM node:18-alpine
WORKDIR /usr/app

COPY . .

CMD ["npm", "run", "start"]
