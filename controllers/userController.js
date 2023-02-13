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
    }

  };
   