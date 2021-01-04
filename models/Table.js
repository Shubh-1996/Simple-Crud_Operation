const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
    photoURL: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Table', tableSchema);