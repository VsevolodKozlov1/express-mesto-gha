const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
  },

  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
