const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedalsByGamesSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  gold: {
    type: Number,
    required: true,
  },
  silver: {
    type: Number,
    required: true,
  },
  bronze: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const MedalsByGames = mongoose.model('medalsByGames', MedalsByGamesSchema);

module.exports = MedalsByGames;
