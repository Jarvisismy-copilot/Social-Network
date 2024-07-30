const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Route to get all thoughts and create a new thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// Route to get, update, or delete a single thought by its ID
router.route('/:thoughtId')

