import express from 'express'
import { userRoutes } from './user'

function getRoutes() {
  const router = express.Router()
  router.use('/user', userRoutes())
  return router
}

export { getRoutes }
