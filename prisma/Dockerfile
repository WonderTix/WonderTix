FROM node:18-alpine
WORKDIR /usr/app

RUN apk add --no-cache bash
COPY /bin/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
CMD /bin/bash /usr/wait-for-it.sh ${DB_HOST}:${DB_PORT} -- npm run start
