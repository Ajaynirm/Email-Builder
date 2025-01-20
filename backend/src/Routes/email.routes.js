import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import EmailTemplate from "../model/email.template.js"

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/getEmailLayout', (req, res) => {
    const layoutPath = path.join(__dirname, '../layout.html');
  
    fs.readFile(layoutPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Could not read layout file' });
      }
  
      console.log("data sent ");
      res.send(data);
    });
  });


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

router.post('/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  });
  


router.post('/uploadEmailConfig', async (req, res) => {
    try {
      const emailTemplate = new EmailTemplate(req.body);
      const savedTemplate = await emailTemplate.save();
      res.status(201).json(savedTemplate);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save email template' });
    }
  });

  router.post('/renderAndDownloadTemplate', (req, res) => {
    const { layout, variables } = req.body;
  
    if (!layout || !variables) {
      return res.status(400).json({ error: 'Layout and variables are required' });
    }
  
    // Replace placeholders in the layout with variable values
    let renderedHtml = layout;
    Object.keys(variables).forEach(key => {
      const placeholder = `{{${key}}}`;
      renderedHtml = renderedHtml.replace(new RegExp(placeholder, 'g'), variables[key]);
    });
  
    res.setHeader('Content-Disposition', 'attachment; filename=email-template.html');
    res.setHeader('Content-Type', 'text/html');
    res.send(renderedHtml);
  });

  export default router;