// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// dotenv.config();

// const app = express();

// app.use(express.static("browser"));

// app.use(cors()); // Use the cors middleware with your options

// const PORT = process.env.PORT || 3000;
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("index.html");
// });

// const authRoute = require("./routes/auth")
// const noticeRoute = require("./routes/notice")
// const belongingsRoute = require("./routes/belongings")
// const messagesRoute = require("./routes/messages")
// const activitysRoute = require("./routes/activity")
// const gatesRoute = require("./routes/gate")
// const cafesRoute = require("./routes/cafe")

// // Database connector code
// mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => {
//         console.log("DB connected successfully!");
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// app.get("/", (req, res) => {
//     res.send("index.html");
// });


// app.use("/auth", authRoute);
// app.use("/notice", noticeRoute);
// app.use("/belongings", belongingsRoute);
// app.use("/messages", messagesRoute);
// app.use("/activity", activitysRoute);
// app.use("/gate", gatesRoute);
// app.use("/cafe", cafesRoute);


// //ROUTE NOT FOUND
// app.use((req, res, next) => {
//     // res.status(404).send("Sorry, route could not be located!");
//     res.redirect("/");
// });

// //ERROR
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send(err.stack);
// });

// app.listen(PORT, () => {
//     console.log(`Server is up and running on PORT: ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path"); // <--- Add this

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Use the cors middleware

// Serve static files from the 'browser' directory (your Angular build output)
// This MUST come before your API routes and any general catch-all routes
app.use(express.static("browser"));

// Database connector code
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((error) => {
        console.log(error);
    });

// API Routes
const authRoute = require("./routes/auth")
const noticeRoute = require("./routes/notice")
const belongingsRoute = require("./routes/belongings")
const messagesRoute = require("./routes/messages")
const activitysRoute = require("./routes/activity")
const gatesRoute = require("./routes/gate")
const cafesRoute = require("./routes/cafe")

app.use("/auth", authRoute);
app.use("/notice", noticeRoute);
app.use("/belongings", belongingsRoute);
app.use("/messages", messagesRoute);
app.use("/activity", activitysRoute);
app.use("/gate", gatesRoute);
app.use("/cafe", cafesRoute);


// This route handles any requests that are NOT caught by your API routes
// and are NOT found as static files. This sends index.html for your Angular app.
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'browser', 'index.html'));
});

//ERROR handler (always last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    // In production, consider sending a less verbose error message
    res.status(500).send("Something broke!"); // More user-friendly message
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});