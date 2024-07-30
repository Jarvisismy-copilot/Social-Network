const Thought = require('../models/Thought');

// Get a single thought by ID
// Create a new thought
// Update a thought by ID
// Delete a thought by ID
// Create a reaction for a thought
// Delete a reaction by ID



// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};