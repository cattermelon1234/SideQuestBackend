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
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    weekly: {
        type: Boolean,
        required: true
    },
    points: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Location', locationSchema)