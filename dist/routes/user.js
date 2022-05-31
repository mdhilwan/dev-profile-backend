"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = userRoutes;

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userRoutes() {
  const router = _express.default.Router();

  router.get('/get/basic', getBasic);
  router.get('/get/employment', getEmployment);
  return router;
}

async function getBasic(req, res) {
  returnData(res, _path.default.normalize(_path.default.join(__dirname, '../data/basic-info.json')));
}

async function getEmployment(req, res) {
  returnData(res, _path.default.normalize(_path.default.join(__dirname, '../data/employment-history.json')));
}

function returnData(res, filepath) {
  readJsonFileSync(filepath).then(val => res.send(val));
}

async function readJsonFileSync(filepath, encoding) {
  if (typeof encoding == 'undefined') {
    encoding = 'utf8';
  }

  let file = _fs.default.readFileSync(filepath, encoding);

  return JSON.parse(file);
}