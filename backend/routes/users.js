const express = require('express')
//const User = require('../models/userModel')
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser
} = require('../controllers/userController')       // importing all functions

//creates an instance of the router
const router = express.Router()

// GET ALL USERS
router.get('/', getUsers)

// GET a single workout
router.get('/:id', getUser)

// POST a new workout
router.post('/', createUser)

// DELETE a new workout
router.delete('/:id', deleteUser)

// UPDATE a new workout
router.patch('/:id', updateUser)

//we export the router at the end
module.exports = router