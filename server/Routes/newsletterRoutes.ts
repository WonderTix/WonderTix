import { app } from "../server";
import { pool } from "../db";

// News Letter Route
app.post("/api/newsletter/count", async (req, res) => {
  try {
    const emails = await pool.query(
      "SELECT COUNT(*) FROM customers WHERE email = $1",
      [req.body.email]
    );
    res.json(emails.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Nesletter Route
app.post("/api/newsletter/update", async (req, res) => {
  try {
    var body = req.body;
    var values = [body.news_opt, body.volunteer_opt, body.email];
    const rows = await pool.query(
      `UPDATE public.customers
              SET newsletter=$1, "volunteer list"=$2
              WHERE email = $3;`,
      values
    );
    res.json(rows.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/newsletter/insert", async (req, res) => {
  try {
    var body = req.body;
    var values = [
      body.custname,
      body.email,
      body.phone,
      body.custaddress,
      body.news_opt,
      false,
      false,
      false,
      body.volunteer_opt,
    ];
    const emails = await pool.query(
      `INSERT INTO public.customers(
              custname, email, phone, custaddress, newsletter, donorbadge, seatingaccom, vip, "volunteer list")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      values
    );
    res.json(emails.rows);
  } catch (err) {
    console.error(err.message);
  }
});
