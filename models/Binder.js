const mongoose = require('mongoose');

// Embedded card schema inside binder
const cardSchema = new mongoose.Schema(
  {
    apiId: { type: String, required: true }, // From Pokémon TCG API
    name: { type: String, required: true },
    level: String,
    hp: String,
    supertype: String,
    subtypes: [String],
    types: [String],
    evolvesFrom: String,
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
    resistances: [
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
      printedTotal: Number,
      total: Number,
      legalities: {
        unlimited: String,
      },
      ptcgoCode: String,
      releaseDate: String,
      updatedAt: String,
      images: {
        symbol: String,
        logo: String,
      },
    },
    number: String,
    artist: String,
    rarity: String,
    flavorText: String,
    nationalPokedexNumbers: [Number],
    legalities: {
      unlimited: String,
    },
    images: {
      small: String,
      large: String,
    },
    tcgplayer: {
      url: String,
      updatedAt: String,
      prices: {
        holofoil: {
          low: Number,
          mid: Number,
          high: Number,
          market: Number,
          directLow: Number,
        },
      },
    },
    cardmarket: {
      url: String,
      updatedAt: String,
      prices: {
        averageSellPrice: Number,
        lowPrice: Number,
        trendPrice: Number,
        germanProLow: Number,
        suggestedPrice: Number,
        reverseHoloSell: Number,
        reverseHoloLow: Number,
        reverseHoloTrend: Number,
        lowPriceExPlus: Number,
        avg1: Number,
        avg7: Number,
        avg30: Number,
        reverseHoloAvg1: Number,
        reverseHoloAvg7: Number,
        reverseHoloAvg30: Number,
      },
    },
  },
  { _id: false }
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
    masterSetCount: {
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
