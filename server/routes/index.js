const path = require('path');

// const interceptor = (req, res, next) => {
//   console.log('hit');
//   next();
// };

module.exports = function (app) {
  const API_ENDPOINT = '/api';
  const API_VERSION = 'v1';
  app.use(
    `${API_ENDPOINT}/${API_VERSION}/medals-by-games`,
    // interceptor(),
    require('./medals-by-games.routes'),
  );

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
