# Install stage
FROM node:18-alpine AS install
WORKDIR /usr/app

RUN apk add --no-cache tzdata
ENV TZ=America/Los_Angeles
ENV PATH ./node_modules/.bin:${PATH}

COPY ./package*.json ./
RUN npm install

# Build stage
FROM node:18-alpine AS build
WORKDIR /usr/app

COPY --from=install /usr/app/node_modules ./node_modules
COPY --from=install /usr/app/package*.json ./
COPY . .

RUN npm run build

# Run stage
FROM node:18-alpine
WORKDIR /usr/app

COPY --from=build /usr/app/package*.json ./
COPY --from=build /usr/app/bin ./bin
COPY --from=build /usr/app/prisma ./prisma

CMD ["npm", "run", "start"]
