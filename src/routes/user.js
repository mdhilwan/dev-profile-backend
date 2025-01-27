import express from 'express'
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';
import { getBasicProfile } from '../data/getBasicProfile';
import { getUser } from '../data/getUser';
import { get } from '../data/utils';

const firebaseConfig = {
  apiKey: "AIzaSyCnZwQ9Jb0lh2OzqyrFpAoxYRs77CyUia4",
  authDomain: "dev-profile-backend.firebaseapp.com",
  projectId: "dev-profile-backend",
  storageBucket: "dev-profile-backend.appspot.com",
  messagingSenderId: "852364024481",
  appId: "1:852364024481:web:4312bb87b06f4422b36ee0",
  measurementId: "G-C3RYWL8J8E"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

function userRoutes() {
  const router = express.Router()
  router.get('/:userId/get/basic', cors(), getBasic)
  router.get('/:userId/get/employment', cors(), getEmployment)
  return router
}

async function getBasic(req, res) {
  const basicProfile = await getBasicProfile(db, req.params.userId);
  res.send(basicProfile);
}

async function getEmployment(req, res) {
  const employments = await getEmploymentProfile(db, req.params.userId);
  res.send(employments);
}

async function getEmploymentProfile(db, userId) {
  const employments = [];
  const user = await getUser(db, userId);
  for (const eUid of user?.employmentUids) {
    const employmentData = await get(doc(db, 'employments', eUid));
    employments.push(employmentData);
  }
  return employments;
}

async function readJsonFileSync(filepath, encoding){
  if (typeof (encoding) == 'undefined'){
    encoding = 'utf8';
  }
  let file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

export { userRoutes }
