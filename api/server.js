require('dotenv').config()

const express = require('express')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-mysql'))
const db = PouchDB('quotes3')
const randomInt = require('random-int')

app.use(cors())

app.use(
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://quotable.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://quote-api.jrscode2.xyz',
    issuer: 'https://quotable.auth0.com/',
    algorithms: ['RS256']
  })
)
app.get('/quote', async (req, res) => {
  // pick a random number between 1 and 75,000
  res.send(await db.get(randomInt(75966).toString()))
})

app.post('/quote', bodyParser.json(), async (req, res) => {
  // need to get max id...
  res.send(await db.put(req.body))
})

app.get('/', (req, res) => res.send({ name: 'quotable api' }))
app.listen(5000)
