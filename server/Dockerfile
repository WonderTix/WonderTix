# Use the Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Upgrade packages and install OpenSSL and bash
# RUN apk upgrade --update-cache --available && \
#     apk add openssl bash && \
#     rm -rf /var/cache/apk/*

# TODO: remove tzdata again...?
RUN apk add --no-cache tzdata
ENV TZ=America/Los_Angeles
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install
COPY . .

# Build the server application if needed
# RUN npm run build ... ?
# TODO: is this needed?
ENV PORT 8080

# Expose the port the application will run on
EXPOSE 8080

# Start the server application
CMD ["npm", "run", "start"]
