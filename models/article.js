const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    validate: {
      validator: (value) => !validator.isEmpty(value, { ignore_whitespace: true }),
      message: 'Invalid keyword',
    },
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: (value) => !validator.isEmpty(value, { ignore_whitespace: true }),
      message: 'Invalid title',
    },
  },
  text: {
    type: String,
    required: true,
    validate: {
      validator: (value) => !validator.isEmpty(value, { ignore_whitespace: true }),
      message: 'Invalid text',
    },
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('article', articleSchema);
