const express = require('express')

const {
  getImages,
  getUserImages,
  getLocationImages,
  createImage,
  deleteImage
} = require('../controllers/imageController')

const router = express.Router()

router.get('/', getImages)

router.get('/user/:id', getUserImages)

router.get('/location/:id', getLocationImages)

router.post('/', createImage)

router.delete('/:id', deleteImage)

module.exports = router