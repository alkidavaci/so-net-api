const { Schema, model } = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of documents 
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Allow to use virtuals, since the default is false
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Create a virtual property "friendCount" that get total count of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize the User model
const User = model('User', userSchema);

// Export the User model
module.exports = User;