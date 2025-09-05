import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.middleware.js';
import notesRoute from './routes/notes.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()); // Cors allow requests from every frontend URL 
app.use(express.json()); // Middleware to parse JSON bodies: req.body
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoute);

// Connect to database THEN start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server running on port 5001');
    });
});

