/*const Location = require('../models/locationModel')
const mongoose = require('mongoose')

const getLocations = async(req, res) => {
  const locations = await Location.find({})
  res.status(200).json(locations)
}

const getLocation = async(req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such  user'})
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  
  res.status(200).json(workout)
}

const createLocation = async(req, res) => {
  const {name, friends, locations} = req.body

  const response = await fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyCqvyCAlJHu44Po6CHow_459F1fjJ49u4E&loading=async&libraries=places&callback=initMap', {
    method: 'GET',
    body: JSON.stringify(workout),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  try {
    const user = await User.create({name, friends, locations})
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

const updateUser = async(req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(workout)
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
}
*/