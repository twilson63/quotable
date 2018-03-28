require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-mysql'))
const db = PouchDB('quotes3')
const randomInt = require('random-int')

app.use(cors())
app.get('/quote', async (req, res) => {
  // pick a random number between 1 and 75,000
  res.send(await db.get(randomInt(75966).toString()).catch(err => ({error: err.message})))
})

app.post('/quote', bodyParser.json(), async (req, res) => {
  // need to get max id...
  res.send(await db.put(req.body))
})

app.get('/', (req, res) => res.send({ name: 'quotable api' }))
app.listen(5000)
