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

