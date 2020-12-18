const mongoose = require('mongoose');
const StateSchema = require('./State.model').StateSchema;

const setSchema = mongoose.Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
    timeMethod: {type: String, enum: ["time", "tempo"], required: true},
    tempo: {type: Number, default: 120},
    states: {type: [StateSchema], default: []},
    creator: {type: String, required: true},
    private: {type: Boolean, default: false},
    likes: {type: Number, default: 0},
    authorizedViewers: {type: [mongoose.ObjectId], default: []}
})

exports.SetSchema = setSchema;
exports.SetModel = mongoose.model('Set', setSchema, 'sets');

