const express = require('express')
//const User = require('../models/userModel')
const {
  //createUser,
  //getUsers,
  //getUser,
  //deleteUser,
  //updateUser,
  loginUser,
  signupUser
} = require('../controllers/userController')       // importing all functions

//creates an instance of the router
const router = express.Router()

// GET ALL USERS
//router.get('/', getUsers)

// GET a single workout
//router.get('/:id', getUser)

// POST a new workout
//router.post('/', createUser)

// DELETE a new workout
//router.delete('/:id', deleteUser)

// UPDATE a new workout
//router.patch('/:id', updateUser)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//we export the router at the end
module.exports = router