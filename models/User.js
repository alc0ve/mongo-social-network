const { Schema, model, Types } = require('mongoose');

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
      unique: true,
      match:  [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address'],
      //must match valid email address (check Mongoose's matching validation)
    },
    thoughts: [{
      //array of '_id' values ref the 'Thought' model
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    friends: [{
      //array of '_id' values ref the 'User' model (self-reference)
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

//create a virtual called 'friendCount' that retrieves the length of user's 'friends' array field on query
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
