require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const locationRoutes = require('./routes/locations')
const imageRoutes = require('./routes/images')
const cors = require('cors');

const axios = require('axios')

// express app
const app = express()

// middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept")
  console.log(req.path, req.method)
  next()
})

// routes
app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/images', imageRoutes)

// connect to mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port ', process.env.PORT)
  })

  })
  .catch((error) => {
    console.log(error)
  })
