const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    to: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: ["cafe", "gate", "school"],
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("message", MessageSchema);