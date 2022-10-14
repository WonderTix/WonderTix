# WonderTix

For the most current stable version see the 'main' branch.

## Overview
Wondertix is a full-featured ticket sales platform and CRM built for Portland Playhouse. It consists of a user ticketing system as well as both ticketing and CRM administrative panels. This project serves a variety of purposes including managing task assignments, financial reporting, and handling ticket sales. Future features include managing/creating email campaigns and ticket exchanges. 

## Setup
There are two says to set this project up. Either directly by installing postgres and using npm, or by using docker. Docker is by far the easier method of installation.

### SSL Keys for localhost
#### Install mkcert
##### Mac
Make sure you have [Brew](https://brew.sh) installed and run `brew install mkcert nss`
##### Windows
Make sure you have [Chocolatey](https://chocolatey.org) installed and run `choco install mkcert`
##### Linux
Using your favorite package manager, install mkcert. If mkcert is not available using your favorite package manager, run the following:
```
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

#### Generate certificates
Run the following commands:
```
mkcert -install
cd <path/to/WonderTix/client>
mkcert localhost
```
This will install the CA for the mkcert certificate and create a certificate for localhost. The application is set to use the `localhost.pem` file for SSL. Copy `localhost.pem` to your `server` directory as well for future changes to SSL on the backend.  

### Docker Setup
1. Install [Docker](https://docs.docker.com/engine/install/ubuntu/)
2. Clone the repository
3. !!!IMPORTANT!!! Run setup.py
4. Run `sudo docker-compose up` ( `docker compose up`  if you're not on Linux)

If you do not run `setup.py` and run `docker-compose up`, you may need to run `docker-compose down --volumes` before running `docker-compose up` again. 

### Standalone Setup
Standalone setup is a little bit more involved. 

1. Install [nodejs and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
2. [Download and install Postgres](https://www.postgresql.org/download/)
3. Run setup.py
4. Make sure Postgres is running and create a user and table with the information specified when running setup.py
5. From the root of the WonderTix project, run `psql -f task_sql/create_task_table.sql`
6. From the root of the WonderTix project, run `psql -f task_sql/wtix_dump_030422.sql`
7. Go into the client folder and run `npm install && npm run start`
8. In a new terminal window, go into the server folder and run `npm install && npm run dev`

## Troubleshooting
This list will be updated as new issues arise. If you your issue is not listed, please create an issue and we will look into it.

### I ran docker-compose up and it says it can't connect to postgres
Make sure that you ran `setup.py`. If you ran `setup.py`, run `docker-compose down --volumes` and try again.
