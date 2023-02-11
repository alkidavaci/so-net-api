const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Schema to create ReactionsSchema model
const ReactionsSchema = new Schema(
    { 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY')
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);

// Schema to create thoughtSchema model
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY"),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
        toJSON: {
             // Allow to use virtuals and getters
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)


// Create a virtual property "reactionCount" that get total count of reactions
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// Initialize the Thought model
const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;

