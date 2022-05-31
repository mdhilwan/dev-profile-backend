"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _loglevel = _interopRequireDefault(require("loglevel"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startServer({
  port = process.env.PORT
} = {}) {
  console.log('starting server');
  const app = (0, _express.default)();
  app.use('/api', (0, _routes.getRoutes)());
  app.use(errorMiddleware);
  return new Promise(resolve => {
    const server = app.listen(port, () => {
      _loglevel.default.info(`Listening on port ${server.address().port}`);

      const originalClose = server.close.bind(server);

      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose);
        });
      };

      setupCloseOnExit(server);
      resolve(server);
    });
  });
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else {
    _loglevel.default.error(error);

    res.status(500);
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {
        stack: error.stack
      })
    });
  }
}

function setupCloseOnExit(server) {
  // thank you stack overflow
  // https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options = {}) {
    await server.close().then(() => {
      _loglevel.default.info('Server successfully closed');
    }).catch(e => {
      _loglevel.default.warn('Something went wrong closing the server', e.stack);
    }); // eslint-disable-next-line no-process-exit

    if (options.exit) process.exit();
  } // do something when app is closing


  process.on('exit', exitHandler); // catches ctrl+c event

  process.on('SIGINT', exitHandler.bind(null, {
    exit: true
  })); // catches "kill pid" (for example: nodemon restart)

  process.on('SIGUSR1', exitHandler.bind(null, {
    exit: true
  }));
  process.on('SIGUSR2', exitHandler.bind(null, {
    exit: true
  })); // catches uncaught exceptions

  process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
  }));
}