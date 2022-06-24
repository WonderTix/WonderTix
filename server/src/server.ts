// server.ts

import cookieParser from "cookie-parser";
import "reflect-metadata";
import Stripe from "stripe";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { accountsRouter } from "./api/accounts/accounts.router";
import { contactsRouter } from "./api/contacts/contacts.router";
import { donationsRouter } from "./api/donations/donations.router";
import { savedReportsRouter } from "./api/saved_reports/saved_reports.router";
import { tasksRouter } from "./api/tasks/tasks.router";
import { taskNotesRouter } from "./api/task_notes/task_notes.router";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = parseInt(process.env.PORT || "8000");
const hostname = process.env.HOSTNAME || "localhost";

let stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("sessionsecret"));

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

// this currently allows requests from any origin
// which presents security vulenerabilities.
// make sure to only allow whitelisted domains
// when we figure out what those will be
app.use(cors(/* OPTIONS HERE */));

/* Connect Routers */

app.use("/api/donations", donationsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/task_notes", taskNotesRouter);
app.use("/api/saved_reports", savedReportsRouter);

app.get("/", (_req, res) => res.send("Hello World."));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
