const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = require("./transporter");
const verifyOTP = require("./verifyOTP");

dotenv.config();

const jwtPrivateKey = process.env.JWTKEY;
const Belongings = require("../models/Belonging");

const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

router.get("/:userId", async(req, res, next) => {
    try {
        if (req.params.userId == "all") {
            var belongings = await Belongings.find();
        } else {
            var belongings = await Belongings.find({ userId: req.params.userId });
        }
        if (!belongings) return res.status(200).json({ message: "No items found" });


        res.status(200).json({ message: "Items Found", belongings });
    } catch (error) {
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    if (!req.body.userId ||
        !req.body.serialKey
    ) {
        return res.status(200).json({ "message": "Please fill the required inputs" })
    }
    try {
        var newBelongings = new Belongings({
            userId: req.body.userId,
            serialKey: req.body.serialKey
        })

        await newBelongings.save()

        console.log("New Items added.");

        res.status(200).json({ "message": "Item saved successfully" })

    } catch (error) {
        next(error)
    }
})

module.exports = router;