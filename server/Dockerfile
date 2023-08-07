FROM node:18-alpine

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

RUN apk add --no-cache bash
COPY /bin/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

RUN apk add --no-cache tzdata
ENV TZ=America/Los_Angeles

WORKDIR /usr/app
COPY ./package*.json .
RUN npm install

CMD /bin/bash /usr/wait-for-it.sh ${DB_HOST}:${DB_PORT} -- npm run dev
