const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = require("./transporter");
const verifyOTP = require("./verifyOTP");

const activity = require("./activity")

dotenv.config();

const jwtPrivateKey = process.env.JWTKEY;
const Users = require("../models/User");
const Activity = require("../models/Activity");

const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

router.post("/enter", async(req, res, next) => {
    if (!req.body.id) {
        return res.status(200).json({ message: "Please fill the required inputs" });
    }
    try {
        var foundUser = await Users.findById(req.body.id)

        var timeElapsed = Date.now();
        var today = new Date(timeElapsed);

        if (!foundUser) return res.status(200).json({ message: "You may NOT enter" });
        console.log(today.toLocaleString());

        if (foundUser.lastMeal) {
            var mealGap = timeElapsed - foundUser.lastMeal
            if (mealGap < 10800000) return res.status(200).json({ message: "You can not enter twice for the same meal time." });
        }




        foundUser.lastMeal = timeElapsed;

        await foundUser.save()

        var newActivity = new Activity({
            userId: foundUser._id,
            title: "Entering the cafe",
            description: `The person is entering the cafe at ${today.toLocaleString()}`,
            category: 'cafe'
        })

        await newActivity.save()

        console.log(`A person called  ${foundUser.username} has enterd the cafe `);
        console.log("New activity added.");

        res.status(200).json({ message: "You may enter" });
    } catch (error) {
        next(error);
    }
});

// router.post("/leave", async(req, res, next) => {
//     if (!req.body.id) {
//         return res.status(200).json({ message: "Please fill the required inputs" });
//     }
//     try {
//         var foundUser = await Users.findById(req.body.id)

//         var timeElapsed = Date.now();
//         var today = new Date(timeElapsed);

//         var newActivity = new Activity({
//             userId: foundUser._id,
//             title: "Leaving the campus",
//             description: `The person is leaving the campus at ${today.toLocaleString()}`,
//             category: 'gate'
//         })

//         await newActivity.save()
//         console.log(`A person called  ${foundUser.username} has left the campus `);
//         console.log("New activity added.");

//         res.status(200).json({ message: "You may leave" });
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;