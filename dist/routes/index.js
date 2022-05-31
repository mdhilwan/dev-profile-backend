"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutes = getRoutes;

var _express = _interopRequireDefault(require("express"));

var _user = require("./user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes() {
  const router = _express.default.Router();

  router.use('/user', (0, _user.userRoutes)());
  return router;
}