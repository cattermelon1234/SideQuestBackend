require('dotenv').config()

const User = require('../models/userModel')
const Location = require('../models/locationModel')
const mongoose = require('mongoose')
const axios = require("axios");

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

const getWeeklyQuests = async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such users'})
  }
  const locations = await Location.find({weekly: true})
  if (!locations) {
    return res.status(404).json({error: 'No such locations'})
  }
  
  var visited = user.locations
  var quests = []

  while (quests.length < 3) {
    const x = Math.floor(Math.random() * locations.length)
    if (!visited.includes(locations[x]) && !quests.includes(locations[x])) {
      quests.push(locations[x])
    }
  }
  res.status(200).json(quests)
}

const getRemainingQuests = async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id)
  const locations = await Location.find({weekly: false})
  var visited = user.locations
  var willAdd = true
  var quests = []

  for (var i = 0; i < locations.length; ++i) {
    for (var j = 0; j < visited.length; ++j) {
      if (visited[j].localeCompare(locations[i]) == 0) {
        willAdd = false
      }
    }
    if (willAdd) {
      quests.push(locations[i]);
    }
    willAdd = true
  }
  res.status(200).json(quests)
}

const getDistance = async(req, res) => {
  
  const latitude = req.params.latitude
  const longitude = req.params.longitude
  const locationId = req.params.locationId

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return res.status(404).json({error: 'No such location'})
  }

  foundLocation = await Location.findById(locationId) 
  console.log(foundLocation)
  const dest_latitude = foundLocation.latitude
  const dest_longitude = foundLocation.longitude

  const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' 
  + dest_latitude + ',' + dest_longitude + '&mode=walking&origins=' + latitude + ',' + longitude + '&key=' + process.env.API_KEY)
  console.log(response)
  console.log(response.data.rows[0].elements[0])
  const distance = response.data.rows[0].elements[0].distance.text
  
  arr = distance.split(" ")
  let value = arr[0];
  if (arr[1].localeCompare('km') == 0) {
    value = value * 1000;
  }
  return res.status(200).json({meters: value})
}

const getClosestLocations = async(req, res) => {
  const latitude = req.body.latitude
  const longitude = req.body.longitude

  const locations = await Location.find({})
  var formatted_locations = []

  for (var i = 0; i < locations.length; ++i) {
    const dest_latitude = locations[i].latitude
    const dest_longitude = locations[i].longitude

    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' 
    + dest_latitude + ',' + dest_longitude + '&mode=walking&origins=' + latitude + ',' + longitude + '&key=' + process.env.API_KEY)
    const distance = response.data.rows[0].elements[0].distance.text
    arr = distance.split(" ")
    let value = arr[0];
    if (arr[1].localeCompare('km') == 0) {
      value = value * 1000;
    }
    formatted_locations.push({
      "distance": value,
      "id": locations[i]._id.toString()
    })
  }

  formatted_locations = formatted_locations.sort((a, b) => {
    if (a.distance < b.distance){
      return -1
    }

  })

  var final_locations = []

  for (var j = 0; j < 5; ++j) {
    console.log(formatted_locations[j])
    final_locations.push(formatted_locations[j].id)
  }
  console.log(final_locations)
  return res.status(200).json(final_locations)
}

const createUser = async(req, res) => {
  const {name} = req.body
  const points = 0;
  const friends = [];
  const locations = [];
  try {
    const user = await User.create({name, points, friends, locations})
    return res.status(200).json(user)
  }
  catch(error) {
    return res.status(404).json({error: error.message})
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
  getDistance,
  getWeeklyQuests,
  getRemainingQuests,
  getClosestLocations,
  loginUser,
  signupUser
}