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
        if (!notices) return res.status(200).json({ message: "No notices found", smallMessage: 'BAD' });

        res.status(200).json({ message: "Notices Found", notices, smallMessage: 'OK' });
    } catch (error) {
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    if (!req.body.title ||
        !req.body.description ||
        !req.body.category
    ) {
        return res.status(200).json({ "message": "Please fill the required inputs", smallMessage: 'BAD' })
    }
    try {
        var newNotice = new Notice({
            category: req.body.category,
            description: req.body.description,
            title: req.body.title,
        })

        await newNotice.save()

        console.log("New notices has been added.");

        res.status(200).json({
            "message": "Notice saved successfully",
            newNotice,
            smallMessage: 'OK'

        })

    } catch (error) {
        next(error)
    }
})
router.put("/", async(req, res, next) => {
    try {
        const updatedNotice = await Notice.findByIdAndUpdate(
            req.body.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json({ message: "Notice updated successfully", updatedNotice, smallMessage: 'OK' });
    } catch (error) {
        next(error);
    }
});
router.delete("/:id", async(req, res, next) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notice deleted successfully", smallMessage: 'OK' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;