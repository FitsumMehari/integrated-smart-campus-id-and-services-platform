const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = require("./transporter");
const verifyOTP = require("./verifyOTP");

dotenv.config();

const jwtPrivateKey = process.env.JWTKEY;
const Belongings = require("../models/Belonging");
const Activity = require("../models/Activity");
const User = require("../models/User");

const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

router.get("/:filter", async(req, res, next) => {
    try {
        if (req.params.filter == "all") {
            var belongings = await Belongings.find();
        } else {
            var belongings = await Belongings.find({ userId: req.params.filter });
        }
        if (!belongings) return res.status(200).json({ message: "No items found" });

        res.status(200).json({ message: "Items Found", belongings });
    } catch (error) {
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    if (!req.body.userId || !req.body.serialKey) {
        return res.status(200).json({ message: "Please fill the required inputs" });
    }
    try {
        var newBelongings = new Belongings({
            userId: req.body.userId,
            serialKey: req.body.serialKey,
        });

        await newBelongings.save();

        console.log("New Items added.");

        var timeElapsed = Date.now();
        var today = new Date(timeElapsed);

        const foundUser = await User.findById(req.params.userId);

        if (foundUser) {
            var newActivity = new Activity({
                userId: foundUser._id,
                title: "Belonging Added",
                description: `${
          foundUser.username
        } has registered a new item with the serial number: ${
          req.body.serialKey
        } at ${today.toLocaleString()}`,
                category: "other",
            });

            await newActivity.save();
            console.log(
                `An item has been registerd as a belonging under a person called  ${foundUser.username} `
            );
            console.log("New activity added.");
        }

        res.status(200).json({ message: "Item saved successfully" });
    } catch (error) {
        next(error);
    }
});


router.delete("/:filter", async(req, res, next) => {
    try {
        if (req.params.filter == "all") {
            var belongings = await Belongings.find();
        } else {
            var belongings = await Belongings.findOneAndDelete({ _id: req.params.filter });
        }
        if (!belongings) return res.status(200).json({ message: "No items found" });

        res.status(200).json({ message: "Items Deleted", belongings });
    } catch (error) {
        next(error);
    }
});

module.exports = router;