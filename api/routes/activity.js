const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = require("./transporter");
const verifyOTP = require("./verifyOTP");

dotenv.config();

const jwtPrivateKey = process.env.JWTKEY;
const Activity = require("../models/Activity");

const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

router.get("/:filter", async(req, res, next) => {
    try {
        if (req.params.filter == "all") {
            var activities = await Activity.find();
        } else if (req.params.filter == "cafe" ||
            req.params.filter == "gate" ||
            req.params.filter == "school"
        ) {
            var activities = await Activity.find({ category: req.params.filter });
        } else {
            var activities = await Activity.find({ userId: req.params.filter });

        }
        if (!activities) return res.status(200).json({ message: "No activities found" });


        res.status(200).json({ message: "Activities Found", activities });
    } catch (error) {
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    if (!req.body.userId ||
        !req.body.description ||
        !req.body.title ||
        !req.body.category
    ) {
        return res.status(200).json({ "message": "Please fill the required inputs" })
    }
    try {
        var newActivity = new Activity({
            userId: req.body.userId,
            description: req.body.description,
            title: req.body.title,
            category: req.body.category
        })

        await newActivity.save()

        console.log("New activity added.");

        res.status(200).json({ "message": "Activity added successfully" })

    } catch (error) {
        next(error)
    }
})

module.exports = router;