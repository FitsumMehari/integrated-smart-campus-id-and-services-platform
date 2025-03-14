const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = require("./transporter");
const verifyOTP = require("./verifyOTP");

dotenv.config();

const jwtPrivateKey = process.env.JWTKEY;
const Notice = require("../models/Notice");

const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

router.get("/:category", async(req, res, next) => {
    try {
        if (req.params.category == "all") {
            var notices = await Notice.find();
        } else {
            var notices = await Notice.find({ category: req.params.category });
        }
        if (!notices) return res.status(200).json({ message: "No notices found" });

        res.status(200).json({ message: "Notices Found", notices });
    } catch (error) {
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    if (!req.body.title ||
        !req.body.owner ||
        !req.body.description ||
        !req.body.category
    ) {
        return res.status(200).json({ "message": "Please fill the required inputs" })
    }
    try {
        var newNotice = new Notice({
            category: req.body.category,
            description: req.body.description,
            owner: req.body.owner,
            title: req.body.title,
        })

        await newNotice.save()

        console.log("New notices has been added.");

        res.status(200).json({ "message": "Notice saved successfully" })

    } catch (error) {
        next(error)
    }
})

module.exports = router;