# CRM Backend

## Windows Quickstart:

Getting the database setup:

Install postgresql:

https://www.postgresql.org/download/

Remember password you set up for later.

Find the SQL shell (psql) on your computer and run it:

Press enter for all the default hosts and ports and enter in your password.

Follow the linux quickstart starting with “Copy the database repo into a folder”.

## Linux Quickstart:

**Getting the database setup:**

From the shell install postgresql:
> sudo apt install postgresql postgresql-contrib

Make sure it is running:
> systemctl status postgresql.service

Login as postgres admin:
> sudo -u postgres psql

Create a new database called wondertix:
> CREATE DATABASE wondertix;

Create a new account:
> CREATE USER your_user WITH PASSWORD ‘mycoolpassword’;

Exit the psql shell with \q and login as the new user into the wondertix database:
> psql -h localhost -d wondertix -U your_user -p 5432

Copy the database repo into a folder:

https://github.com/WonderTix/Omicron-Theta

Run the included sql scripts:
> \i /PATH/TO/wtix_dump_030422.sql;
> \i /PATH/TO/create_task_table.sql;
Don't use "\" in your path name.

Copy in the csv data:
> \copy reservation FROM ‘/PATH/TO/reservation_data.csv’ DELIMITER ‘,’ CSV HEADER;
> \copy task FROM ‘/PATH/TO/task_data.csv’ DELIMITER ‘,’ CSV HEADER;
> \copy task_notes FROM ‘/PATH/TO/task_notes_data.csv’ DELIMITER ‘,’ CSV HEADER;

Create the saved reports table:
> CREATE TABLE IF NOT EXISTS saved_reports(
>     id serial PRIMARY KEY,
>     table_name text,
>     query_attr text
> );

**Getting the current code:**

Install git: 
> sudo apt install git-all

or

https://git-scm.com/downloads

Create a folder and File>Open Folder in vscode.

Clone the repo in that folder by running clone in the vscode terminal:
> git clone https://github.com/WonderTix/CRM

**Getting the backend running:**

Install node:

https://nodejs.org/en/download/package-manager/

Create a file named ‘.env’ in the base CRM folder and paste in the text below with \<text> replaced with your input:

> PORT=8000
    
> DB_USER=\<the username you made>
    
> DB_DATABASE=\<the wodertix db you made>
    
> DB_PASSWORD=\<the password you made>
    
> DB_PORT=5432
    
> DB_HOST=localhost
    

Go into the vscode terminal and go into the server folder:
> cd server

In under the server directory in the terminal run:
> npm install
> npm run dev
    
Go to the website localhost:8000
Try out localhost:8000/api/accounts

If you see your database data, you did it!
