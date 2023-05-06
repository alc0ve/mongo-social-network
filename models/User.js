const { Schema, model } = require('mongoose');

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
      unique: true,
      required: true,
      //must match valid email address (check Mongoose's matching validation)
    },
    thoughts: [{
      //array of '_id' values ref the 'Thought' model
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    friendss: [{
      //array of '_id' values ref the 'User' model (self-reference)
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//create a virtual called 'friendCount' that retrieves the length of user's 'friends' array field on query

const User = model('user', userSchema);

module.exports = User;
