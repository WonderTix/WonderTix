# CRM Backend

## Setup Instructions:

- Make sure `wondertix.db` is setup and running in postgres, same as ticketing project.
- Add saved_reports table to database.

```
CREATE TABLE IF NOT EXISTS saved_reports(
    id serial PRIMARY KEY,
    table_name text,
    query_attr text
);
```

- Create a `.env` file at the root CRM directory (outside of server folder).
- Fill in missing variables in `.env`.

```
PORT=8000
DB_USER= ...
DB_DATABASE= ...
DB_PASSWORD= ...
DB_PORT=5432
DB_HOST=localhost
```

- Install the necessary dependencies

```
npm install
```

- Run the server development script

```
npm run dev
```
