const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth")
const noticeRoute = require("./routes/notice")
const belongingsRoute = require("./routes/belongings")
const messagesRoute = require("./routes/messages")
const activitysRoute = require("./routes/activity")
const gatesRoute = require("./routes/gate")
const cafesRoute = require("./routes/cafe")

dotenv.config();

const app = express();

// app.use(express.static("browser"));

app.use(cors()); // Use the cors middleware with your options

const PORT = 4500;
app.use(express.json());

// Database connector code
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    // res.send("index.html");

});

app.use("/auth", authRoute);
app.use("/notice", noticeRoute);
app.use("/belongings", belongingsRoute);
app.use("/messages", messagesRoute);
app.use("/activity", activitysRoute);
app.use("/gate", gatesRoute);
app.use("/cafe", cafesRoute);

//ROUTE NOT FOUND
app.use((req, res, next) => {
    // res.status(404).send("Sorry, route could not be located!");
    res.redirect("/");
});

//ERROR
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});

module.exports = app;