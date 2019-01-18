import path from 'path'
import http from 'http'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'

import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import { BasicStrategy } from 'passport-http'

import swaggerRouter from './routes/swagger'
import apiRouter from './routes/api'
import bitBucketRouter from './routes/bit-bucket'

import { getLogger } from './util/logging'

const log = getLogger('server')

const AUTH_USER = process.env.AUTH_USER || 'fu'
const AUTH_PASS = process.env.AUTH_PASS || 'bar'

// TODO performance best practices - https://expressjs.com/en/advanced/best-practice-performance.html
const app = express()
export default app

const whitelist = {
  origin: ['https://app-localhost.com:9000', 'https://app-localhost.com:3000'],
  default: 'https://app-localhost.com:3000',
}

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*')*://localhost:*/*
  // res.header('Access-Control-Allow-Origin', 'https://localhost:9000') //* ://localhost:*/* https://localhost:3888/*
  const origin = whitelist.origin.indexOf(req.header('host').toLowerCase()) > -1 ? req.headers.origin : whitelist.default
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD'])
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(morgan('combined'))

app.use(compression()) // could be provided by reverse proxy nginx, haproxy, etc.

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'cats',
}))

app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new BasicStrategy((userid, password, done) => {
  if (userid === AUTH_USER && password === AUTH_PASS) {
    return done(null, true)
  }
  return done(null, false)
}))

app.use(passport.initialize())
app.use(passport.session())

// Mount this below the desired public routes and above the desired secured routes
// This is currently above all routes making them all secured
app.use(passport.authenticate('basic', { failureRedirect: undefined }),
  (req, res, next) => {
    next()
  })

app.use(express.static(path.join(__dirname, '../public')))

const options = {
  index: '/test/index.html',
}

// static content
app.use(express.static(path.join(__dirname, '../public'), options))

app.use(bitBucketRouter)
app.use(swaggerRouter)

app.use('/', apiRouter)

export async function init() {
  log.info('Starting initialization')
  try {
    const httpServer = http.createServer(app)

    httpServer.listen(3000, () => {
      log.info('http server is listening on 3080')
    })
      .on('error', (err) => {
        log.error(err, 'Error initializing express http')
        setTimeout(() => process.exit(1), 5000)
      })
  } catch (err) {
    log.error(err, 'Error initializing services')
    setTimeout(() => process.exit(1), 5000)
  }
  log.info('Initialization completed')
}
