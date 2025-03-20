// This file defines the Card model for the MongoDB database using Mongoose.
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  apiId: { type: String, required: true, unique: true }, // Pokémon TCG API ID
  name: { type: String, required: true },
  supertype: { type: String },
  subtypes: [{ type: String }],
  hp: { type: String },
  types: [{ type: String }],
  evolvesFrom: { type: String },
  abilities: [
    {
      name: String,
      text: String,
      type: String,
    },
  ],
  attacks: [
    {
      name: String,
      cost: [String],
      convertedEnergyCost: Number,
      damage: String,
      text: String,
    },
  ],
  weaknesses: [
    {
      type: String,
      value: String,
    },
  ],
  retreatCost: [String],
  convertedRetreatCost: Number,
  set: {
    id: String,
    name: String,
    series: String,
    releaseDate: String,
    images: {
      symbol: String,
      logo: String,
    },
  },
  rarity: { type: String },
  flavorText: { type: String },
  nationalPokedexNumbers: [Number],
  legalities: {
    unlimited: String,
    standard: String,
    expanded: String,
  },
  images: {
    small: String,
    large: String,
  },
  prices: {
    tcgplayer: {
      url: String,
      updatedAt: String,
      normal: {
        low: Number,
        mid: Number,
        high: Number,
        market: Number,
        directLow: Number,
      },
      reverseHolofoil: {
        low: Number,
        mid: Number,
        high: Number,
        market: Number,
        directLow: Number,
      },
    },
    cardmarket: {
      url: String,
      updatedAt: String,
      averageSellPrice: Number,
      lowPrice: Number,
      trendPrice: Number,
    },
  },
  binder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Binder',
    required: true,
  },
});

module.exports = mongoose.model('Card', cardSchema);
