const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: false
    },
    friends: [String],
    locations: [String]
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)