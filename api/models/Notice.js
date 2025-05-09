const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    // owner: {
    //     type: String,
    //     required: false,
    // },
    category: {
        type: String,
        enum: ["cafe", "gate", "school"],
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("notice", NoticeSchema);