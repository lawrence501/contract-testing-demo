const express = require('express')
const cors = require('cors')
const moment = require('moment')
const bodyParser = require('body-parser')
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

server.get('/records/:clientId', (req, res) => {
  console.log(`Received records request for clientId '${req.params.clientId}'`)
  res.status(200)
  res.json({
    id: "lmacdonald",
    name: "Lawrence MacDonald",
    sex: "MALE"
  })
})

module.exports = {
  server,
}