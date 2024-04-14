const User = require('../models/userModel')
const Location = require('../models/locationModel')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const getUsers = async(req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}

const getUser = async(req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such  user'})
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  
  res.status(200).json(user)
}

const createUser = async(req, res) => {
  const {name} = req.body
  const points = 0;
  const friends = [];
  const locations = [];
  try {
    const user = await User.create({name, points, friends, locations})
    res.status(200).json(user)
  }
  catch(error) {
    res.status(404).json({error: error.message})
  }
}

const deleteUser = async(req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  const user = await User.findOneAndDelete({_id: id})
  if (!user) {
    return res.status(404).JSON({error: 'no such user'})
  }
  res.status(200).json(user)
}

const addUserFriend = async(req, res) => {
  const {id} = req.params
  const friendId = req.body.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  myUser = await User.findById(id)
  const friendArray = myUser.friends

  for(var i = 0; i < friendArray.length; ++i) { 
    if (friendId.localeCompare(friendArray[i]) == 0) {
      return res.status(404).json({error: 'user is already a friend!'})
    }
  }
  const user = await User.updateOne({ _id: id }, { $push: { friends: friendId} });
  foundUser = await User.findById(id)

  if (!foundUser) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(foundUser)
}

const removeUserFriend = async(req, res) => {
  const {id} = req.params
  const friendId = req.body.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.updateOne({ _id: id }, { $pull: { friends: friendId} });
  foundUser = await User.findById(id)

  if (!foundUser) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(foundUser)
}

const updateUserLocation = async(req, res) => {
  const {id} = req.params
  const locationId = req.body.locationId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return res.status(404).json({error: 'No such location'})
  }

  myUser = await User.findById(id)
  const locationArray = myUser.locations

  for(var i = 0; i < locationArray.length; ++i) { 
    if (locationId.localeCompare(locationArray[i]) == 0) {
      return res.status(404).json({error: 'location already exists!'})
    }
  }

  user = await User.updateOne({ _id: id }, { $push: { locations: locationId } });
  foundLocation = await Location.findById(locationId) 
  const pts = foundLocation.points

  user = await User.updateOne({ _id: id }, { $inc: { 'points': pts } })
  foundUser = await User.findById(id)

  if (!foundUser) {
    return res.status(404).json({error: 'No such location to remove'})
  }
  res.status(200).json(foundUser)
}

const updateUserName = async(req, res) => {
  const {id} = req.params
  const name = req.body.name
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  user = User.updateOne({ _id: id }, { name: name } )
  
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login
const loginUser = async(req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    //create token
    const token = createToken(user._id)

    res.status(200).json({email, token})

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//signup
const signupUser = async(req, res) => {
  const {name, email, password} = req.body

  try {
    const user = await User.signup(name, email, password)

    //create token
    const token = createToken(user._id)

    res.status(200).json({email, token})

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  addUserFriend,
  removeUserFriend,
  updateUserLocation,
  updateUserName,
  loginUser,
  signupUser
}