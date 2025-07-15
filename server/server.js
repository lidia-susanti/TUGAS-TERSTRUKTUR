const path = require('path')
const express = require('express')
const { MongoClient } = require('mongodb')
const template = require('./../template').default  // ✅ Tambahkan `.default` di sini

// Comment out this line if you're building for production
const devBundle = require('./devBundle')

const app = express()

// Enable webpack middleware only in development
devBundle(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
  res.status(200).send(template())  // ✅ Ini akan memanggil fungsi HTML dari template.js
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    return console.error("❌ Failed to connect to database:", err)
  }
  console.log("✅ Connected successfully to mongodb server")
  client.close()
})
