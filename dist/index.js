"use strict";

var _loglevel = _interopRequireDefault(require("loglevel"));

var _start = require("./start");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isTest = process.env.NODE_ENV === 'test';
const logLevel = process.env.LOG_LEVEL || (isTest ? 'warn' : 'info');

_loglevel.default.setLevel(logLevel);

(0, _start.startServer)();