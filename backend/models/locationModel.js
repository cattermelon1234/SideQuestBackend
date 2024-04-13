const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Location', locationSchema)