# CRM Backend Setup Guide

## Windows Quickstart:

**Getting the database setup:**

1. Install postgresql:

    https://www.postgresql.org/download/
    
    *Remember password you set up for later.*

2. Find the SQL shell (psql) on your computer and run it:
    
    ![image](https://user-images.githubusercontent.com/18134813/162672641-aeccb831-d339-4509-9414-742427f4cdfc.png)

3. Press enter for all the default hosts and ports and enter in your password.

4. Create a new database called wondertix:

    `CREATE DATABASE wondertix;`

5. Continue from the "**Initializaing the Database**" section.

## Linux Quickstart:

**Getting the database setup:**

1. From the shell install postgresql:

    `sudo apt install postgresql postgresql-contrib`

2. Make sure it is running:

    `systemctl status postgresql.service`

3. Login as postgres admin:

    `sudo -u postgres psql`

4. From within the psql shell, create a new database called wondertix:

    `CREATE DATABASE wondertix;`

5. Create a new account:

    `CREATE USER your_user WITH PASSWORD 'mycoolpassword';`

6. Exit the psql shell with \q and login as the new user into the wondertix database:

    `psql -h localhost -d wondertix -U your_user -p 5432`

## Initializing the Database (both Linux & Windows)
1. Copy the database repo into a folder:

    https://github.com/WonderTix/Omicron-Theta

2. Run the included sql scripts in the psql shell under the wondertix database:

    `\c wondertix;`

    `\i '/PATH/TO/wtix_db.sql';`

*Don't use "\\" in your path name.*

3. Exit the psql shell with \q and re-enter into the wondertix database.

4. Create the saved reports table:

    `\c wondertix;`

    `CREATE TABLE IF NOT EXISTS saved_reports(id serial PRIMARY KEY, table_name text, query_attr text);`

## Getting the current code 

1. Install git:
 
    `sudo apt install git-all`

   or

   https://git-scm.com/downloads

2. Create a folder and File>Open Folder in vscode.

3. Clone the repo in that folder by running clone in the vscode terminal:

    `git clone https://github.com/WonderTix/CRM`

## Getting the backend running 

1. Install node:

> https://nodejs.org/en/download/package-manager/
> 
> (Using Snap causes issues on Linux, use NodeSource instead)

2. For the REST API, create a file named ‘.env’ in the base CRM folder and paste in the text below with \<text> replaced with your input:
```PORT=8000

DB_USER=\<the username you made>

DB_DATABASE=\<the wondertix db you made>

DB_PASSWORD=\<the password you made>

DB_PORT=5432

DB_HOST=localhost
```

3. Go into the vscode terminal and go into the server folder:

    `cd server`

4. For the GraphQL API, create a file named ‘.env’ in CRM/server with the following text (replaced like above):

    `DATABASE_URL="postgresql://<username>:<password>@localhost:5432/mydb?schema=public"`
    
(See Prisma's [getting started guide](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres) for clarification)

5. Update Prisma Schema and Generate GraphQL API:
    
    `npx prisma db pull`

    `npx prisma generate`
    

6. Under the server directory, in the terminal run:
    
    `npm install`
    
    `npm run dev`
    
7. For the REST API, go to the website `localhost:8000`
   
   For the GraphQL API go to `localhost:4000`

   Try out `localhost:8000/api/accounts`
    
   Try out Apollo Studio from localhost:4000 

   https://www.apollographql.com/docs/studio/

   Try out: `npx prisma studio`

### If you see your database data, you did it!
