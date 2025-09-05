import express from 'express';
import notesRoute from './routes/notes.route.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
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

