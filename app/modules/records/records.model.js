const mongoose = require('../../_helpers/db');

let users = mongoose.Schema({

    counts: {type: Array},
    key:{type: String},
    value:String,
    resetPasswordExpiry:String

}, { timestamps: { createdAt: true } });

module.exports = mongoose.model('records', users);