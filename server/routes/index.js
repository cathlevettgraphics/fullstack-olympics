const path = require('path');

module.exports = function (app) {
  const API_ENDPOINT = '/api';
  const API_VERSION = 'v1';
  // ! Todo change these routes ?? Do I need them
  app.use(
    `${API_ENDPOINT}/${API_VERSION}/medals-by-games`,
    require('./medals-by-games.routes'),
  );
  // ! Add the other routes when above test case works

  //! Todo handle ajax 404 vs static files
  app.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.join(__dirname, '../../client/', 'build/index.html'));
    }
  });
  app.all('*', (req, res) => {
    res.sendStatus(404);
  });
};
