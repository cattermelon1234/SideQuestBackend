const Location = require('../models/locationModel')
const mongoose = require('mongoose')

//get all locations
const getLocations = async(req, res) => {
  const locations = await Location.find({})
  res.status(200).json(locations)
}

//get a single location
const getLocation = async(req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such location'})
  }

  const location = await Location.findById(id)

  if (!location) {
    return res.status(404).json({error: 'No such location'})
  }

  return res.status(200).json(location)
}

// create new location
const createLocation = async(req, res) => {
  const {placeId} = req.body

  try {
    const location = await Location.create({placeId})
    res.status(200).json(location)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  getLocations,
  getLocation,
  createLocation
}