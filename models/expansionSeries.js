// This file defines the ExpansionSeries model for the MongoDB database using Mongoose.
const mongoose = require('mongoose');

const expansionSeriesSchema = new mongoose.Schema({
  seriesName: {
    type: String,
    required: true,
    unique: true,
  },
  expansions: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('ExpansionSeries', expansionSeriesSchema);
