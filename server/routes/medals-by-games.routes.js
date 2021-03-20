const path = require('path');
const express = require('express');
const router = express.Router();
const {
  getMedalsByGames,
  addMedalsByGames,
  updateMedalsByGames,
  removeMedalsByGames,
} = require('./../controllers/medals-by-games.controller');

router
  .get('/:id?', getMedalsByGames)
  .post('/', addMedalsByGames)
  .put('/:id', updateMedalsByGames)
  .delete('/:id', removeMedalsByGames);

module.exports = router;
