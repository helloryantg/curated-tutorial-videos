const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const helmet = require('helmet')

// App
const app = express()

require('dotenv').config()
require('./config/database')

// Middleware
app.use(helmet())
app.use(logger('tiny'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/auth', require('./controllers/auth.controller'))
app.use('/users', require('./controllers/user.controller'))
app.use('/videoLists', require('./controllers/videoList.controller'))
app.use('/videos', require('./controllers/video.controller'))
app.use('/likes', require('./controllers/like.controller'))
app.use('/comments', require('./controllers/comment.controller'))

// Catch all route
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Error' : error.stack
  });
});

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`))