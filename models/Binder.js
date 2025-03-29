const mongoose = require('mongoose');

// Embedded card schema inside binder
const cardSchema = new mongoose.Schema(
  {
    apiId: { type: String, required: true }, // From Pokémon TCG API
    name: { type: String, required: true },
    images: {
      small: String,
      large: String,
    },
    set: {
      id: String,
      name: String,
      series: String,
    },
    supertype: String,
    subtypes: [String],
    rarity: String,
    hp: String,
    types: [String],
  },
  { _id: false } // Don't generate a Mongo ID for embedded cards
);

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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cards: [cardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Binder', binderSchema);
