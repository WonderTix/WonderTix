import { pool } from "../../../db";
import { app } from "../../server";

app.get("/api/email_subscriptions/newsletter", async (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  try {
    const emails = await pool.query(
      "Select email from customers where newsletter = True"
    );
    res.json(emails.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/email_subscriptions/volunteers", async (req, res) => {
  try {
    const emails = await pool.query(
      'Select email from customers where "volunteer list" = True'
    );
    res.json(emails.rows);
  } catch (err) {
    console.error(err.message);
  }
});
