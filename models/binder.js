// This file defines the Binder model for the MongoDB database.
const mongoose = require('mongoose');

const binderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpansionSeries',
    required: true,
  },
  expansion: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Binder', binderSchema);

