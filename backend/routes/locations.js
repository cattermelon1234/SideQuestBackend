const express = require('express')

const {
  getLocations,
  getLocation,
  createLocation
} = require('../controllers/locationController')

const router = express.Router()

router.get('/', getLocations)

router.get('/:id', getLocation)

router.post('/', createLocation)

module.exports = router




