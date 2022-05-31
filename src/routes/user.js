import express from 'express'
import fs from 'fs';
import path from 'path';

function userRoutes() {
  const router = express.Router()
  router.get('/get/basic', getBasic)
  router.get('/get/employment', getEmployment)
  return router
}

async function getBasic(req, res) {
  returnData(res, path.normalize(path.join(__dirname, '../data/basic-info.json')));
}

async function getEmployment(req, res) {
  returnData(res, path.normalize(path.join(__dirname, '../data/employment-history.json')));
}

function returnData(res, filepath) {
  readJsonFileSync(filepath).then(val => res.send(val));
}

async function readJsonFileSync(filepath, encoding){
  if (typeof (encoding) == 'undefined'){
    encoding = 'utf8';
  }
  let file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

export { userRoutes }
