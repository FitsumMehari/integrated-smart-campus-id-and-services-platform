const mongoose = require("mongoose");

const BelongingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
    },
    serialKey: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("belonging", BelongingSchema);