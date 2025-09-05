import mongoose from "mongoose";
import Note from "../models/Note.model.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({
            message: 'Notes fetched successfully',
            data: notes
        });
    } catch (error) {
        console.error("Error fetching notes: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const createNote = (req, res) => {
    try {
        const { title, content } = req.body;

        const newNote = new Note({ title, content });
        newNote.save();

        res.status(201).json({
            message: 'Note created successfully',
            data: newNote
        });
    } catch (error) {
        console.error("Error creating note: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateNote = async (req, res) => {
    try {
        // Retrieve ID from params
        const { id } = req.params;
        // Retrieve updated data from body
        const { title, content } = req.body;

        // Find the note by ID and update it
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true }); // new: true returns the updated document

        // If no note found, return 404
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({
            message: 'Note updated successfully',
            data: updatedNote
        });
    } catch (error) {
        console.error("Error updating note: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteNote = async (req, res) => {
    try {
        // Retrieve ID from params
        const { id } = req.params;

        // Find the note by ID and delete it
        const deletedNote = await Note.findByIdAndDelete(id);

        // If no note found, return 404
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error("Error deleting note: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getNoteById = async (req, res) => {
    try {
        // Retrieve ID from params
        const { id } = req.params;
        // Find the note by ID
        const note = await Note.findById(id);

        // If no note found, return 404
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({
            message: 'Note fetched successfully',
            data: note
        });
    } catch (error) {
        console.error("Error fetching note by ID: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}