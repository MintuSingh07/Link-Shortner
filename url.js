const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        require: true
    },
    
    originalUrl: {
        type: String,
        require: true
    },

}, {timestamps: true});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;