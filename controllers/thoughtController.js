const { User, Thought } = require("../models");

module.exports = {
    // Get all thoughts. Route '/'
    getAllThought(req, res) {
        // Receive all the documents from Thought
        Thought.find({})
            // Return data in json format
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // Create one thought. Route '/'
    createThought(req, res) {
        // Create a new thought in the "Thought" collection
        Thought.create(req.body)
            .then(({ _id }) => {
                // Find a user with and push a thought
                return User.findOneAndUpdate(
                    // Filter the query by requested id
                    { _id: req.body.userId },
                    // Push the new thought ID to the "thoughts" array
                    { $push: { thoughts: _id } },
                    // Return the updated document
                    { new: true }
                );
            })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Get one thought. Route '/:thoughtId'
    getOneThought(req, res) {
        // Retrieve a single thought from the "Thought" collection
        Thought.findOne({ _id: req.params.thoughtId })
            // Exclude the "__v" property from the returned user document
            .select("-__v")
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No thought with this ID!" })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Update a thought. Route '/:thoughtId'
    updateThought({ req, body }, res) {
        // Update a single thought in the "thought" collection based on the provided thought ID
        Thought.findOneAndUpdate(
            // Filter the query by requested id
            { _id: req.params.thoughtId },
            // Specify the update operation (request body)
            { $set: req.body },
            // Run validators on the update operation and return the updated document
            { runValidators: true, new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(thoughtData)
            )
            .catch(err => res.json(err));
    },

    // Delete a thought. Route '/:thoughtId'
    deleteThought(req, res) {
        // Delete a single thought in the "thought" collection based on the provided thought ID
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : User.findOneAndUpdate(
                        // Filter the query by requested id
                        { thoughts: req.params.thoughtId },
                        // Remove the requested thought ID from the array
                        { $pull: { thoughts: req.params.thoughtId } },
                        // Return the updated document
                        { new: true }
                    )
            )
            .catch(err => res.json(err));
    },

    // Create a reaction. Route '/:thoughtId/reactions'
    createReaction(req, res) {
        // Update a single reaction in the "thought" collection based on the provided thought ID
        Thought.findOneAndUpdate(
            // Filter the query by requested id
            { _id: req.params.thoughtId },
            // Specify the update operation (request body)
            { $push: { reactions: req.body } },
            // Run validators on the update operation and return the updated document
            { runValidators: true, new: true }
        )
            // Methods to populate "friend" documents
            .populate({ path: 'reactions', select: '-__v' })
            // Exclude the "__v" property from the returned user document
            .select('-__v')
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(thoughtData)
            )
            .catch(err => res.json(err));
    },

    /// Delete a reaction. Route '/:thoughtId/reactions/:reactionId'
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // Remove the requested reactionId from the array
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            // Return the updated document
            { new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(thoughtData)
            )
            .catch(err => res.json(err));
    }

};
