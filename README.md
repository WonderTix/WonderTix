# WonderTix
Main branch is the latest stable release. Develop branch is the latest development release.

## Overview
WonderTix is a full-featured ticket sales platform and CRM built for Portland Playhouse. 
It consists of a user ticketing system as well as both ticketing and CRM administrative panels. 
This project serves a variety of purposes including managing task assignments, financial reporting, and handling ticket sales. 
Future features include managing/creating email campaigns and ticket exchanges. 

## Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- mkcert
  - Mac: install with [Brew](https://brew.sh) `brew install mkcert nss`
  - Windows: install with [Chocolatey](https://chocolatey.org) `choco install mkcert`
  - Linux: install with your favorite package manager. If mkcert is not available using your favorite package manager, run the following:
    ```
    curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
    chmod +x mkcert-v*-linux-amd64
    sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
    ```
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## Setup
1. Clone the repository.
2. Copy `.env.dist` to `.env`
   1. Set the values for `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET`. *you can get these values from the team lead*
   2. Set the value for `PRIVATE_STRIPE_KEY` and `PUBLIC_STRIPE_KEY`. *you can get this value from the team lead*
   3. Set the value for `PRIVATE_STRIPE_WEBHOOK`. *explained in step 5*
3. In `<path/to/WonderTix/server>` Run `mkcert -install` to install the local certificate authority
   1. Run `mkcert localhost` to create a certfiicate.   
5. Run `docker-compose up -d`
6. To test the checkout process with Stripe, make sure the Stripe CLI is installed. 
   1. Run `stripe login` and press enter to accept access. This only needs to be done once.
   2. Run `stripe listen --forward-to https://localhost:8000/api/1/order/webhook` and copy the resulting ***signing secret*** as your `PRIVATE_STRIPE_WEBHOOK` variable.
7. The client will be available at https://localhost:3000 
   1. You will need to accept the self-signed certificate. In chrome click anywhere on the page and type `thisisunsafe`. This will allow you to continue to the site.
8. The server will be available at https://localhost:8000
9. The swagger docs will be available at https://localhost:8000/api/docs
   1. To log in to swagger, login to the client and copy the value of the `access_token` from the request to `<AUTH0_URL>/oath/token`. Paste this value into the `Authorize` dialog in swagger.

## Connecting to the database
### Use CLI in container
1. SSH into to the container with `docker compose exec database sh`.
2. Run `psql -U <PG_USER> <PG_DB>` to connect to the database.
### Use PGAdmin
1. Download PGAdmin: https://www.pgadmin.org/download/
2. Open PGAdmin and create a new server.
3. Set the credentials to the values in the `.env` file.

## Troubleshooting
This list will be updated as new issues arise. If you your issue is not listed, please create an issue and we will look into it.

### Changes are not being reflected
The client and server are built with docker. In most cases you can restart the containers with `docker-compose restart`. 

If that does not work, you can try `docker-compose down`, `docker-compose build --no-cache`, `docker compose up -d --build`.



