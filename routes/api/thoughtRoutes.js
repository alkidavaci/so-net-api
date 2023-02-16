const router = require('express').Router();

const {
    getAllThought,
    createThought,
    getOneThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// GET all thoughts and POST one thought. Route '/api/thoughts'
router.route('/')
    .get(getAllThought).
    post(createThought);

// GET, PUT and DELETE by iD. Route '/api/thoughts/:thoughtId'
router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

//  POST new reactions. Route '/api/thoughts/:thoughtId/reactions'
router.route('/:thoughtId/reactions')
.post(createReaction);

// DELETE reaction by ID. Route '/api/thoughts/:thoughtId/reactions/:reactionId'
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;