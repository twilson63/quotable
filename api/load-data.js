require('dotenv').config()

const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-mysql'))
const db = PouchDB('quotes3')

const fs = require('fs')

const csv = require('fast-csv')

const s = fs.createReadStream('./quotes_all.csv')
let id = 1
const csvStream = csv({ delimiter: ';', headers: true })
  .on('data', o => {
    db
      .put({
        _id: id.toString(),
        quote: o.QUOTE,
        author: o.AUTHOR,
        genre: o.GENRE,
        type: 'QUOTE'
      })
      .then(console.log.bind(console))
      .catch(console.log.bind(console))
    id++
  })
  .on('end', () => console.log('done'))
  .on('error', err => console.log(err.message))

s.pipe(csvStream)
