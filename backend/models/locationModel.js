const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Location', locationSchema)