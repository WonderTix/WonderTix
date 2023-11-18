FROM node:18-alpine
WORKDIR /usr/app
COPY ./package*.json ./

RUN apk add --no-cache tzdata
RUN npm install

COPY . .

ENV TZ=America/Los_Angeles
ENV PORT 8080

CMD ["npm", "run", "start"]
