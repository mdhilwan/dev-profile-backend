import express from 'express'
import fs from 'fs';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';
import { getBasicProfile } from '../data/getBasicProfile';
import { getUser } from '../data/getUser';
import { get } from '../data/utils';
import 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
