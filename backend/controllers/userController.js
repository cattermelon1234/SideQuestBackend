const User = require('../models/userModel')
const Location = require('../models/locationModel')
const mongoose = require('mongoose')

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
  console.log("trying to create a user")
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
  console.log(friendId)
  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }


  const user = await User.updateOne({ _id: id }, { $push: { friends: friendId} });

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}

const removeUserFriend = async(req, res) => {
  const {id} = req.params
  const friendId = req.body.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.updateOne({ _id: id }, { $pull: { friends: friendId} });

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}

const updateUserLocation = async(req, res) => {
  const {id} = req.params
  const locationId = req.body.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.updateOne({ _id: id }, { $push: { locations: locationId } });

  if (!user) {
    return res.status(404).json({error: 'No such location to remove'})
  }
  res.status(200).json(user)
}

const updateUserPoints = async(req, res) => {
  const {id} = req.params
  const locationId = req.body.locationId
  var points

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return res.status(404).json({error: 'No such location'})
  }

  Location.findById(locationId, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        points = docs.points
    }
  });

  user = User.updateOne({ _id: id }, { $inc: { points: points } })
    .catch((err) => {
      console.log(err)
  }); 

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}

const updateUserName = async(req, res) => {
  const {id} = req.params
  const {name} = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  user = User.updateOne({ _id: id }, { name: name } )
    .catch((err) => {
      console.log(err)
  }); 
  
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  addUserFriend,
  removeUserFriend,
  updateUserLocation,
  updateUserPoints,
  updateUserName,
}