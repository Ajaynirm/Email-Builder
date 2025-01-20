import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import emailRoutes from '../src/Routes/email.routes.js'
import dotenv from "dotenv"



dotenv.config();
const app=express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/emails', emailRoutes);

const port = process.env.PORT || 6000;


app.listen(port,()=>console.log("listening on port "+port));

app.use('/',emailRoutes);


