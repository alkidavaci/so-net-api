// Require User and Thought models
const { User, Thought } = require("../models");


module.exports = {

    // Get all users. Route '/'
    getAllUser(req, res) {
      // Receive all the documents from Users
      User.find({})
      // Return data in json format
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
   
    // Create a user.  Route '/'
    createUser(req, res) {
      // Create a new user in the "User" collection
      User.create(req.body)
          // Return data in json format
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Get single user.  Route '/:userId'
  getSingleUser(req, res) {
    // Retrieve a single user from the "User" collection
    User.findOne({ _id: req.params.userId })
      // Methods to populate "thought" documents
      .populate("thoughts")
      // Methods to populate "friend" documents
      .populate("friends")
      // Exclude the "__v" property from the returned user document
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }

  };
   