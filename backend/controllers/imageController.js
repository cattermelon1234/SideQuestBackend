const Image = require('../models/imageModel')
const mongoose = require('mongoose')

const getImages = async(req, res) => {
    const images = await Image.find({})
    res.status(200).json(images)
}

const getUserImages = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such images'})
    } 
    const images = await Image.find({userId: id})
    if (!images) {
        return res.status(404).json({error: 'No such images'})
    }
    res.status(200).json(images)
}

const getLocationImages = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such images not valid'})
    } 
    const images = await Image.find({locationId: id})
    if (!images) {
        return res.status(404).json({error: 'No such images'})
    }
    res.status(200).json(images)
}

const createImage = async(req, res) => {
    const {userId, locationId, file} = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({error: 'No such user'})
    } 
    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(404).json({error: 'No such location'})
    } 

    try {
        const image = await Image.create({userId, locationId, file})
        res.status(200).json(image)
    } catch(error) {
        res.status(404).json({error: error.message})
    }
}

const deleteImage = async(req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such image'})
  }
  const image = await Image.findOneAndDelete({_id: id})
  if (!image) {
    return res.status(404).JSON({error: 'no such image'})
  }
  res.status(200).json(image)
}

module.exports = {
  getImages,
  getUserImages,
  getLocationImages,
  createImage,
  deleteImage
}