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
  },

  // Update a user  Route '/:userId'
  updateUser(req, res) {
    // Update a single user in the "User" collection based on the provided user ID
    User.findOneAndUpdate(
      // Filter the query by requested id
      { _id: req.params.userId },
      // Specify the update operation (request body)
      { $set: req.body },
      // Run validators on the update operation and return the updated document
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user  Route '/:userId'
  deleteUser(req, res) {
    // Delete a single user in the "User" collection based on the provided user ID.
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch(err => res.status(400).json(err));
  },

  // Update a user  Route '//:userId/friends/:friendId'
  addFriend(req, res) {
    // Update a single user document in the "User" collection based on the provided user ID. 
    User.findOneAndUpdate(
      // Filter the query by requested id
      { _id: params.id },
      // Push the new friend ID to the "friends" array
      { $push: { friends: req.params.friendId } },
      // Return the updated document
      { new: true })
      // Populate the "friends" field in the document with the data from the "friends" collection
      .populate({ path: 'friends', select: ('-__v') })
      // Exclude the "__v" property from the returned user document
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch(err => res.json(err));
  },

  // Delete a user  Route '//:userId/friends/:friendId'
  deleteFriend(req, res) {
    //  Find a user with requested ID and update their friends list by removing the friend with requested ID
    User.findOneAndUpdate(
      // Filter the query by requested id
      { _id: req.params.id },
      // Remove the requested friend ID from the array
      { $pull: { friends: req.params.friendId } },
      // Return the updated document
      { new: true })
      // Populate the "friends" field in the document with the data from the "friends" collection
      .populate({ path: 'friends', select: '-__v' })
      // Exclude the "__v" property from the returned user document
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch(err => res.status(400).json(err));
  }

};
