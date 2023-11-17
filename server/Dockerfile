FROM node:18-alpine
WORKDIR /usr/app
COPY ./package*.json ./
COPY . .

RUN apk add --no-cache tzdata
RUN npm install

ENV TZ=America/Los_Angeles
ENV PORT 8080

CMD ["npm", "run", "start"]
