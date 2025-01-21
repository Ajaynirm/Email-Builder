import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import EmailTemplate from "../model/email.template.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/getEmailLayout", async(req, res) => {
  const layoutPath = path.join(__dirname, "../layout.html");

  fs.readFile(layoutPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read layout file" });
    }
    res.send(data);
  });
});

router.post("/uploadEmailConfig", async (req, res) => {
  try {
    const emailTemplate = new EmailTemplate(req.body);
    const savedTemplate = await emailTemplate.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(500).json({ error: "Failed to save email template" });
  }
});

export default router;
