// This file defines the Binder model for the MongoDB database.
const mongoose = require('mongoose');

// Card schema to embed into binderSchema below

const cardSchema = new mongoose.Schema(
  {
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Binder Schema

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExpansionSeries',
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cards: [cardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Binder', binderSchema);
