const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')

// App
const app = express()

require('dotenv').config()
require('./config/database')

// Middleware
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/auth', require('./controllers/auth.controller'))

// Catch all route
app.get('*', (req, res) => { res.send('404 not found!') })

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`))