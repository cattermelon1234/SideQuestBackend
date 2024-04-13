const Location = require('../models/locationModel')
const mongoose = require('mongoose')
const axios = require("axios");
const API_KEY = 'AIzaSyCqvyCAlJHu44Po6CHow_459F1fjJ49u4E'

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

  const coordinates = await axios.get('https://places.googleapis.com/v1/places/' + placeId + '?fields=location&key=' + API_KEY)
  const addressFormatted = await axios.get('https://places.googleapis.com/v1/places/' + placeId + '?fields=formattedAddress&key=' + API_KEY)
  const nameData = await axios.get('https://places.googleapis.com/v1/places/' + placeId + '?fields=displayName&key=' + API_KEY)

  const name = nameData.data.displayName.text
  const address = addressFormatted.data.formattedAddress
  const latitude = coordinates.data.location.latitude
  const longitude = coordinates.data.location.longitude

  try {
    const location = await Location.create({name, placeId, latitude, longitude, address})
    console.log(latitude)
    console.log(longitude)
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