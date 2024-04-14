const express = require('express')

const {
  getLocations,
  getLocation,
  createLocation,
  deleteLocation,
  getLocationPercentage
} = require('../controllers/locationController')

const router = express.Router()

router.get('/', getLocations)

router.get('/:id', getLocation)

router.post('/', createLocation)

router.delete('/:id', deleteLocation)

router.get('/percent/:id', getLocationPercentage)

module.exports = router




