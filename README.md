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

    ```bash
    curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
    chmod +x mkcert-v*-linux-amd64
    sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
    ```

- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## Setup

1. Clone the repository.

   1. Open your command line.
   2. Navigate to desired folder to install WonderTix repository
   3. Execute the following command:
      ```
      git clone https://github.com/WonderTix/WonderTix.git
      ```

2. Create a `.env` file and copy over the contents from the `.env.dist` (.env example) file
   1. Set the values for `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET`. _you must get these values from the team lead_
   2. Set the value for `PRIVATE_STRIPE_KEY` and `PUBLIC_STRIPE_KEY`. _you must get this value from the team lead_
   3. Set the value for `PRIVATE_STRIPE_WEBHOOK`. **explained in step 5**
   4. Team Leads Auth0 Key provisioning instructions:
      1. Obtain access to the wtix-dev Auth0 account.
      2. Go to Applications > Applications > Default App
      3. Use a secure note transfer service to send the Client ID and Client Secret to your team members.
3. Create mkcert certificate
   1. Navigate to `<path/to/WonderTix/server>`
   2. Run `mkcert -install` to install the local certificate authority
   3. Run `mkcert localhost` to create a certificate.
4. Run `docker-compose up -d`
5. To test the checkout process with Stripe, make sure the Stripe CLI is installed.
   1. Run `stripe login` and press enter to accept access. This only needs to be done once.
   2. Run `stripe listen --forward-to https://localhost:8000/api/1/order/webhook` and copy the resulting **_signing secret_** as your `PRIVATE_STRIPE_WEBHOOK` variable.
6. The client will be available at <https://localhost:3000>
   1. You will need to accept the self-signed certificate. In chrome click anywhere on the page and type `thisisunsafe`. This will allow you to continue to the site.
7. The server will be available at <https://localhost:8000>
8. The swagger docs will be available at <https://localhost:8000/api/docs>
   1. To log in to swagger, login to the client and copy the value of the `access_token` from the request to `<AUTH0_URL>/oath/token`. Paste this value into the `Authorize` dialog in swagger.

## Connecting to the database

### Use CLI in container

1. SSH into to the container with `docker compose exec database sh`.
2. Run `psql -U <PG_USER> <PG_DB>` to connect to the database.

### Use PGAdmin

1. Download PGAdmin: <https://www.pgadmin.org/download/>
2. Open PGAdmin and create a new server.
3. Set the credentials to the values in the `.env` file.

## Using the WonderTix.code-workspace in VSCode

Open the folder where you cloned your repository to then:

1. Double click the `WonderTix.code-workspace` file to open it in VSCode
2. You can click `File -> Open Workspace from File...` to open it if VSCode is open already

Once it is open, you will notice 4 folders in the Explorer pane on the left side of the screen.

Here you will see:

1. `WonderTix Root`: The root folder of the whole project
2. `WonderTix Server`: The folder containing the backend/server code
3. `WonderTix Client`: The folder containing the frontend/client code
4. `WonderTix Deploy`: The folder containing the deployment/terraform code

This allows VSCode to keep your files organized, as well as getting the Jest tests running properly. Simply double click a folder for the project you want to work on and everything will run in that particular project, including opening a new terminal.

### Using Swagger:

1. To get the bearer token, create a user by going through the signup process in WonderTix.
   - For admin functions, make sure the user has an admin role (contact team lead for admin role).
   - Team Leads: In the User section of Auth0, you can grant individual users an admin role.
2. Log into the client.
3. Once you're logged in, open the dev tools menu (Chrome), refresh the page, and find the `token` in the Network tab.
4. Go to the Preview section for that token and then right click on the `access_token` and `Copy string contents`.
5. Paste that into the bearerAuth input after clicking the "Authorize" button within Swagger (https://localhost:8000/api/docs).

## Troubleshooting

This list will be updated as new issues arise. If you your issue is not listed, please create an issue and we will look into it.

### Changes are not being reflected

The client and server are built with docker. In most cases you can restart the containers with `docker-compose restart`.

If that does not work, you can try `docker-compose down`, `docker-compose build --no-cache`, `docker compose up -d --build`.
