require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const locationRoutes = require('./routes/locations')

const axios = require('axios')

// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/locations', locationRoutes)

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
