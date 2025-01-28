import logger from 'loglevel'
import { startServer } from './start'

const isTest = process.env.NODE_ENV === 'test'
const logLevel = process.env.LOG_LEVEL || (isTest ? 'warn' : 'info')
const port = process.env.PORT

logger.setLevel(logLevel)

startServer({port})
