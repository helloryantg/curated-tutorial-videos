const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const helmet = require('helmet')

const middlewares = require('./middlewares/middlewares');

// App
const app = express()

require('dotenv').config()
require('./config/database')

// Middleware
app.use(helmet())
app.use(logger('tiny'))
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())
app.use(bodyParser.json({ type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', require('./controllers/auth.controller'))
app.use('/api/users', require('./controllers/user.controller'))
app.use('/api/videoLists', require('./controllers/videoList.controller'))
app.use('/api/videos', require('./controllers/video.controller'))
app.use('/api/likes', require('./controllers/like.controller'))
app.use('/api/comments', require('./controllers/comment.controller'))

// Catch all route
app.use(middlewares.notFound);

// Error handling middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`))