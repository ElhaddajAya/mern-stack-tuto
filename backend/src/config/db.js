import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // Must install dotenv and configure it in server.js

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database : ", error);
        process.exit(1); // Exit process with failure (1)
    }
}