const router = require('express').Router();

const {
    getAllThought,
    createThought,
    getOneThought,
    updateThought,
    deleteThought
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

module.exports = router;