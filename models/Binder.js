const mongoose = require('mongoose');

// Embedded card schema inside binder
const cardSchema = new mongoose.Schema({}, { strict: false });

const binderSchema = new mongoose.Schema(
  {
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
    set: {
      id: String,
      name: String,
      series: String,
    },
    series: {
      type: String,
    },
    gridSize: {
      rows: {
        type: Number,
        required: true,
        default: 3,
        min: [1, 'Minimum of 1 row required'],
        max: [4, 'Maximum of 4 rows allowed'],
      },
      cols: {
        type: Number,
        default: 3,
        min: [1, 'Minimum 1 column required'],
        max: [4, 'Maximum 4 columns allowed'],
      },
    },
    totalCardCount: {
      type: Number,
      default: 1,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cards: [cardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Binder', binderSchema);
