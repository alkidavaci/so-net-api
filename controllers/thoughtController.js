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
          ? res.status(404).json({ message: "No User find with this ID!" })
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
};
