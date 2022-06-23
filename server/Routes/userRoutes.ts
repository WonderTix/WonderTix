import { app } from "../server";
import bcrypt from "bcryptjs";
import { pool } from "../db";

app.get("/api/user", (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted isAuthenticated function
  return res.send(req.user);
});

const isSuperadmin = (req, res, next) => {
  // if (req.user && req.user.is_superadmin) return next();
  // else return res.sendStatus(401);
};

app.get("/api/users", isSuperadmin, async (req, res) => {
  console.log("getusers");
  const users = await pool.query("SELECT * FROM users;");
  users.rows.forEach((e) => delete e.pass_hash);
  res.json(users.rows);
});

app.post("/api/newUser", isSuperadmin, async (req, res) => {
  const passHash = await bcrypt.hash(req.body.password, 10);
  try {
    await pool.query(
      "INSERT INTO users (username, pass_hash) VALUES ($1, $2);",
      [req.body.username, passHash]
    );
  } catch (e) {
    res.json({ error: "USER_EXISTS" });
    return;
  }
  res.json({});
});

app.post("/api/changeUser", isSuperadmin, async (req, res) => {
  let sql = "";
  let vals = [];
  if (req.body.username) {
    sql = "UPDATE users SET username = $1 WHERE id = $2;";
    vals = [req.body.username, req.body.id];
  } else if (req.body.password) {
    const passHash = await bcrypt.hash(req.body.password, 10);
    sql = "UPDATE users SET pass_hash = $1 WHERE id = $2;";
    vals = [passHash, req.body.id];
  } else res.sendStatus(200);
  await pool.query(sql, vals);
  res.sendStatus(200);
});

app.post("/api/deleteUser", isSuperadmin, async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = $1;", [req.body.id]);
  res.sendStatus(200);
});

//Login route
app.post("/api/login", (req, res) => {
  // going to need to use auth0 authentication middleware
  // deleted passport functions
  res.sendStatus(200);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

app.post("/api/passwordChange", async (req, res) => {
  const newHash = await bcrypt.hash(req.body.newPassword, 10);
  const sql = "UPDATE users SET pass_hash = $1 WHERE id = $2;";
  // @ts-ignore
  await pool.query(sql, [newHash, req.user.id]);
  res.sendStatus(200);
});
