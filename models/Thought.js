const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //Use a getter method to format the timestamp on query
    },
    //the user that created this thought
    username: {
      type: String,
      required: true,
    },
    //these are like replies
    //array of nested docs created with the 'reactionSchema'
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Create a virtual called 'reactionCount' that retrieves the length of the thought's 'reactions' array field on query.

const Thought = model('thought', thoughtSchema);

module.exports = Thought;



      // Sets a default value of 12 weeks from now
      // default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),