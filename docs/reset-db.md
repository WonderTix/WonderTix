
## Guide to Resetting the `wtix-db-dev` Database Using `wtix-dev` Account

### Prerequisites:

- Confirm you have the `DB_PASSWORD` password for the `wtix-dev` user, which should be stored in GCP Secret Manager.
- Open up a Cloud Shell instance in GCP.

### Steps:

1. **Retrieve the `wtix-dev` User Password**:
   ```sh
   gcloud secrets versions access "dev" --secret="DB_PASSWORD"
   ```
   - Ensure you have the necessary permissions to access the secret.
   - You may also use the GCP UI to access the Secret Manager.

2. **Connect to PostgreSQL Database**:
   ```sh
   gcloud sql connect wtix-db-dev -d postgres -u wtix-dev --quiet
   ```
   - Enter the password for the `wtix-dev` user when prompted.

3. **Terminate All Active Connections**:
   ```sql
   SELECT pg_terminate_backend(pg_stat_activity.pid)
   FROM pg_stat_activity
   WHERE pg_stat_activity.datname = 'wtix-db-dev'
   AND pid <> pg_backend_pid();
   ```

4. **Drop and Recreate the Database**:
   ```sql
   DROP DATABASE "wtix-db-dev";
   CREATE DATABASE "wtix-db-dev";
   ALTER DATABASE "wtix-db-dev" OWNER TO "wtix-dev";
   ```

5. **Run the `wtix-server-manual` GCP Trigger to Rebuild, Redeploy, and Reseed the Server**:
   - This can be found under `Cloud Build > Triggers` in the GCP UI.
   - The deployment has a habit of failing, but you can just rerun the trigger until it deploys successfully.

### Important Notes:

- Always confirm with your team before proceeding with database reset operations.
- Make sure to back up any important data before performing destructive actions.
- Ensure you are using the correct credentials and have the necessary permissions for each step.
