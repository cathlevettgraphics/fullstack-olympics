const MedalsByGames = require('./../models/medals-by-games.model');
const { errorHandler } = require('./utils');

exports.getMedalsByGames = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  MedalsByGames.find(query).exec((err, medals) => {
    if (err) return errorHandler(res, err);
    if (req.params.id && medals.length === 0)
      return res.status(404).send({ message: 'No olympic games with that ID' });
    return res.status(200).json(medals);
  });
};

exports.addMedalsByGames = function (req, res) {
  const medalsData = req.body;
  console.log('medalsData', medalsData);
  const newMedalsData = new MedalsByGames(medalsData);
  newMedalsData.save((err, newMedalsData) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(newMedalsData);
  });
};

exports.updateMedalsByGames = function (req, res) {
  MedalsByGames.updateOne(
    { _id: req.params.id },
    req.body,
    function (err, result) {
      if (err) return errorHandler(res, err);
      console.log(result);
      if (result.nModified === 0)
        return res
          .status(404)
          .send({ message: 'No olympic games with that ID' });
      res.sendStatus(200);
    },
  );
};

exports.removeMedalsByGames = function (req, res) {
  const medalsByGamesId = req.params.id;
  MedalsByGames.deleteOne({ _id: medalsByGamesId }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log('report', report);
    if (medalsByGamesId && report.deletedCount === 0) {
      return res.status(404).send({ message: 'No olympic games with that ID' });
    }
    res.sendStatus(204);
  });
};
