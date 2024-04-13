const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    placeId: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Location', locationSchema)