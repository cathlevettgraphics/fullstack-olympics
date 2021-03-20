const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedalsByGamesSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  medals: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const MedalsByGames = mongoose.model('medalsByGames', MedalsByGamesSchema);

module.exports = MedalsByGames;
