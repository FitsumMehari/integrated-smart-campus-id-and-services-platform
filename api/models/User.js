const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    studentId: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    userType: {
        type: String,
        enum: ["school", "cafe", "gate", "student", "admin", "guest"],
        default: "student",
        required: false,
    },
    generatedOTP: {
        type: String,
        required: false,
    },
    profilePic: {
        type: String,
        required: false,
    },
    digitalId: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    department: {
        type: String,
        required: false,
    },
    cafeStatus: {
        type: String,
        enum: ["cafe", "noncafe", "selfsponsored"],
        required: false,
    },
    lastMeal: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("user", UserSchema);