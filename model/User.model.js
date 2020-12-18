const mongoose = require('mongoose');
const Set = require('./Set.model').SetSchema

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        min: 6,
        max: 255
    },
    email: { 
        type: String, 
        required: true,
        max: 255, 
        min: 6
    },
    password: { 
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    sets: { 
        type: [mongoose.ObjectId],
        default: []
    }
})

module.exports = mongoose.model('User', userSchema, 'users');