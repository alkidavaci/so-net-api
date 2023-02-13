const { User, Thought } = require("../models");

module.exports = {

  // Get all thoughts. Route '/'
  getAllThought(req, res) {
    // Receive all the documents from Thought
    Thought.find({})
      // Return data in json format
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get one thought. Route '/'
  getOneThought(req, res) {
    // Retrieve a single thought from the "Thought" collection
    Thought.findOne({ _id: req.params.thoughtId })
      // Exclude the "__v" property from the returned user document
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};