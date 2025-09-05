import mongoose from "mongoose";

// 1- Create a schema
// 2- Create a model based on that schema
// 3- Export the model

// Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Create createdAt and updatedAt fields

// Model
const Note = mongoose.model('Note', noteSchema);

// Export the model
export default Note;