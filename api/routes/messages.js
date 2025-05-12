const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = require("./transporter");
const verifyOTP = require("./verifyOTP");

dotenv.config();

const jwtPrivateKey = process.env.JWTKEY;
const Messages = require("../models/Message");

const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

router.get("/:category", async(req, res, next) => {
    try {
        if (req.params.category == "all") {
            var messages = await Messages.find();
        } else {
            var messages = await Messages.find({ category: req.params.category });
        }
        if (!messages) return res.status(200).json({ message: "No messages found" });


        res.status(200).json({ message: "Messages Found", messages });
    } catch (error) {
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    if (!req.body.message ||
        !req.body.category
    ) {
        return res.status(200).json({ "message": "Please fill the required inputs" })
    }
    try {
        var newMessage = new Messages({
            message: req.body.message,
            category: req.body.category,
            from: req.body.from,
        })

        await newMessage.save()

        console.log("New messages added.");

        res.status(200).json({ "message": "Message sent successfully" })

    } catch (error) {
        next(error)
    }
})
router.put("/:id", async(req, res, next) => {
    try {
        const updatedMessage = await Messages.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedMessage);
    } catch (error) {
        next(error);
    }
});
router.delete("/:id", async(req, res, next) => {
    try {
        await Messages.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        next(error);
    }
});
module.exports = router;