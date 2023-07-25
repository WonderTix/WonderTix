# WonderTix
Main branch is the latest stable release. Develop branch is the latest development release.

## Overview
WonderTix is a full-featured ticket sales platform and CRM built for Portland Playhouse. 
It consists of a user ticketing system as well as both ticketing and CRM administrative panels. 
This project serves a variety of purposes including managing task assignments, financial reporting, and handling ticket sales. 
Future features include managing/creating email campaigns and ticket exchanges. 

## Requirements
-  [Docker Desktop](https://www.docker.com/products/docker-desktop)
-  mkcert
   -  Mac: install with [Brew](https://brew.sh) `brew install mkcert nss`
   -  Windows: install with [Chocolatey](https://chocolatey.org) `choco install mkcert`
   -  Linux: install with your favorite package manager. If mkcert is not available using your favorite package manager, run the following:
    ```
    curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
    chmod +x mkcert-v*-linux-amd64
    sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
    ```
-  Set up [Stripe CLI](https://stripe.com/docs/stripe-cli)
   -  Go to stripe.com and create an account.
   -  When you are logged in, and at the dashboard page, click the link: API Keys for developers.
   -  Here you will see your Public(Publishable) key and Private(Secret) key. Place these in your `.env` file.
   -  Make sure you complete Setup > Step 6. 
      - In the process you will get a pairing code, which you can ignore, continue by pressing `Enter` to open a browser and login to Stripe to continue the pairing process.
   -  After running:
      ```
         stripe listen --forward-to https://localhost:8000/api/1/order/webhook
      ```
      you will get a webhook signing secret starting with `whsec_`, which you will place into your `.env` file as the [PRIVATE_STRIPE_WEBHOOK] variable. 

## Setup
1. Clone the repository.
   1. Open your command line. 
   2. Navigate to desired folder to install WonderTix repository
   3. Execute the following command:
      ```
      git clone https://github.com/WonderTix/WonderTix.git
      ```

2. Create a `.env` file and copy over the contents from the `.env.dist` (.env example) file
   1. Set the values for `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET`. *you must get these values from the team lead*
   2. Set the value for `PRIVATE_STRIPE_KEY` and `PUBLIC_STRIPE_KEY`. *you must get this value from the team lead*
   3. Set the value for `PRIVATE_STRIPE_WEBHOOK`. **explained in step 5**
3. Create mkcert certificate
   1. Navigate to `<path/to/WonderTix/server>` 
   2. Run `mkcert -install` to install the local certificate authority
   3. Run `mkcert localhost` to create a certificate.   
4. Run `docker-compose up -d`
5. To test the checkout process with Stripe, make sure the Stripe CLI is installed. 
   1. Run `stripe login` and press enter to accept access. This only needs to be done once.
   2. Run `stripe listen --forward-to https://localhost:8000/api/1/order/webhook` and copy the resulting ***signing secret*** as your `PRIVATE_STRIPE_WEBHOOK` variable.
6. The client will be available at https://localhost:3000 
   1. You will need to accept the self-signed certificate. In Chrome click anywhere on the page and type `thisisunsafe`. This will allow you to continue to the site.
7. The server will be available at https://localhost:8000
8. The swagger docs will be available at https://localhost:8000/api/docs
   1. To log in to swagger, login to the client and copy the value of the `access_token` from the request to `<AUTH0_URL>/oath/token`. Paste this value into the `Authorize` dialog in swagger.

## Connecting to the database
### Use CLI in container
1. SSH into to the container with `docker compose exec database sh`.
2. Run `psql -U <PG_USER> <PG_DB>` to connect to the database.
### Use PGAdmin
1. Download PGAdmin: https://www.pgadmin.org/download/
2. Open PGAdmin and create a new server.
3. Set the credentials to the values in the `.env` file.

### Using Swagger:
1. To get the bearer token, create a user by going through the signup process in WonderTix. 
   - For admin functions, make sure the user has an admin role (contact team lead for admin privileges from Auth0).
2. Log into the client. 
3. Once you're logged in, open the dev tools menu (Chrome), refresh the page, and find the `token` in the Network tab.
4. Go to the Preview section for that token and then right click on the `access_token` and `Copy string contents`. 
5. Paste that into the bearerAuth input (labeled "Authorize") in Swagger (https://localhost:8000/api/docs).

## Troubleshooting
This list will be updated as new issues arise. If you your issue is not listed, please create an issue and we will look into it.

### Changes are not being reflected
The client and server are built with docker. In most cases you can restart the containers with `docker-compose restart`. 

If that does not work, you can try `docker-compose down`, `docker-compose build --no-cache`, `docker compose up -d --build`.
