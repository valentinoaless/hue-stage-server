const mongoose = require('mongoose');

let stateSchema = mongoose.Schema({
    hue: {type: Number, required: true},
    sat: {type: Number, required: true},
    bri: {type: Number, required: true},
    transitiontime: {type: Number, required: true},
    lightOn: {type: Boolean, required: true},
    duration: {type: Number, required: true},
    UIhue: {type: Number, required: true},
    UIsat: {type: Number, required: true},
    UIbri: {type: Number, required: true}
})


exports.StateSchema = stateSchema;