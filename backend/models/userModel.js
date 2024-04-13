const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    friends: {
        type: SVGStringList,
        required: true
    },
    locations: {
        type: SVGStringList,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)