const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    title: {
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

module.exports = mongoose.model("activity", ActivitySchema);