import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import emailRoutes from "../src/Routes/email.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://email-builder-gold-nu.vercel.app/",
    credentials: true,
  })
);

connectDB();

app.use("/api/emails", emailRoutes);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log("listening on port " + port));
