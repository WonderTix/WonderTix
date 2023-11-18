# Build stage
FROM node:lts-alpine as build
WORKDIR /app

COPY ./package*.json ./
COPY ./playwright.config.ts ./
COPY ./tsconfig.json ./
COPY ./e2e ./e2e

RUN npm install @playwright/test \
    dotenv \
    typescript

RUN npx tsc

# Run stage
FROM node:lts-alpine
WORKDIR /app

COPY --from=build /app/e2e ./e2e
COPY --from=build /app/*.js ./

RUN npm install playwright-firefox

CMD ["npx", "playwright", "test", "--project=firefox"]
