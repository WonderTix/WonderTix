### Guide to Resetting the `wtix-db-dev` Database Using `wtix-dev` Account

#### Prerequisites:
- Ensure you have SSH access to the `wtix-sql-connector` VM.
- Confirm you have the password for the `wtix-dev` user, which should be stored in GCP Secret Manager.
- Have the required permissions to start and stop the VM in Google Cloud Compute Engine.

#### Steps:

1. **Start the VM**:
   - Go to the Google Cloud Console.
   - Navigate to Compute Engine -> VM instances.
   - Locate the `wtix-sql-connector` VM.
   - Click the Start button to boot up the VM if it's not already running.

2. **SSH into the Connector VM**:
   - Once the VM is running, click on the `SSH` button. 

3. **Retrieve the Password**:
   - Retrieve the password for the `wtix-dev` user from the Secret Manager:
     ```sh
     gcloud secrets versions access “dev” --secret="DB_PASSWORD"
     ```
   - Ensure you have the necessary permissions to access the secret.
   - You may also use the GCP Console to access the Secret Manager
   - Make sure you view the password for the `dev` alias/version. 

4. **Connect to the PostgreSQL Database**:
   - Connect to the `postgres` database using the `psql` command:
     ```sh
     psql -h 10.40.0.3 -U wtix-dev -d postgres
     ```
   - Enter the password for the `wtix-dev` user when prompted.

5. **Terminate Active Connections**:
   - Terminate all active connections to the `wtix-db-dev` database:
     ```sql
     SELECT pg_terminate_backend(pg_stat_activity.pid)
     FROM pg_stat_activity
     WHERE pg_stat_activity.datname = 'wtix-db-dev'
     AND pid <> pg_backend_pid();
     ```

6. **Drop and Recreate the Database**:
   - Drop the `wtix-db-dev` database:
     ```sql
     DROP DATABASE "wtix-db-dev";
     ```
   - Create a new `wtix-db-dev` database:
     ```sql
     CREATE DATABASE "wtix-db-dev";
     ```
   - Change the ownership if necessary:
     ```sql
     ALTER DATABASE "wtix-db-dev" OWNER TO "wtix-dev";
     ```

7. **Exit `psql`**:
   - Exit the `psql` session by typing:
     ```sql
     \q
     ```

8. **Stop the VM** (after you're done):
   - It's important to stop the VM if it's no longer in use to avoid unnecessary charges.
   - Go back to the Google Cloud Console.
   - Navigate to Compute Engine -> VM instances.
   - Locate the `wtix-sql-connector` VM.
   - Click the Stop button to shut down the VM.

#### Important Notes:

- Always confirm with your team before proceeding with database reset operations.
- Make sure to back up any important data before performing destructive actions.
- Ensure you are using the correct credentials and have the necessary permissions for each step.
- Stopping the VM when not in use. Prevent resource waste!
- **This only wipes the database. It does not reseed the database.** 
