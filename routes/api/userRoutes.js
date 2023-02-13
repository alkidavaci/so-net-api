const router = require('express').Router();

// Destructuring the object exported from the userController
const {
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// GET all and POST a user. Route'/api/users '
router.route('/')
.get(getAllUser)
.post(createUser);

// GET, PUT and DELETE a user by ID. Route '/api/users/:userId'
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// POST and DELETE a friend by ID. Route '/api/users/:userId/friends/:friendId'
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;