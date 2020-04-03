const mongoose = require('mongoose');

const MSGSchema = mongoose.Schema({
    _id: String,
    message: String
}, {
    timestamps: true
});

module.exports = mongoose.model('MSG', MSGSchema);