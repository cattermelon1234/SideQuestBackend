const express = require('express')
//const User = require('../models/userModel')
const {
  createUser,
  getUsers,
  getUser,
  getWeeklyQuests,
  getRemainingQuests,
  getDistance,
  getClosestLocations,
  deleteUser,
  addUserFriend,
  removeUserFriend,
  updateUserLocation,
  updateUserName,
  loginUser,
  signupUser
} = require('../controllers/userController')       // importing all functions

//creates an instance of the router
const router = express.Router()

// GET ALL USERS
router.get('/', getUsers)

// GET a single workout
router.get('/:id', getUser)

router.get('/getWeeklyQuests/:id', getWeeklyQuests)

router.get('/getRemainingQuests/:id', getRemainingQuests)

router.get('/getDistance/:latitude/:longitude/:locationId', getDistance)

router.post('/getClosestLocations', getClosestLocations)

router.post('/', createUser)
router.delete('/:id', deleteUser)

// UPDATE a new workout
router.patch('/addUserFriend/:id', addUserFriend)

router.patch('/removeUserFriend/:id', removeUserFriend)

router.patch('/updateUserLocation/:id', updateUserLocation)

router.patch('/updateUserName/:id', updateUserName)
// POST a new workout
router.post('/', createUser)

// DELETE a new workout
router.delete('/:id', deleteUser)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//we export the router at the end
module.exports = router