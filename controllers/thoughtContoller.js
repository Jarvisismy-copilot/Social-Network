const Thought = require('../models/Thought');


// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
            // Get all thoughts
            // Get a single thought by ID

// Create a new thought
// Update a thought by ID

// Get a single thought by ID
const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single thought by ID
const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a thought by ID
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(updatedThought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/// Need to convert remaining functions plus reset API thoughts in total // 

// Update a thought by ID
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(updatedThought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a thought by ID
// Create a reaction for a thought
// Delete a reaction by ID 



// Delete a thought by ID
const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json({ message: 'Thought deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
