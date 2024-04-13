const express = require('express')

const {
  getLocations,
  getLocation,
  createLocation,
  deleteLocation
} = require('../controllers/locationController')

const router = express.Router()

router.get('/', getLocations)

router.get('/:id', getLocation)

router.post('/', createLocation)

router.delete('/:id', deleteLocation)

module.exports = router




