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
const path = require("path"); // <--- Make sure this is here!

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 1. Serve static files from the 'browser' directory.
// This handles all your Angular build output (index.html, main.js, styles.css, etc.)
// It MUST come before any specific API routes or the catch-all route.
app.use(express.static(path.join(__dirname, "browser"))); // <--- Use path.join for robustness

// Database connector code
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((error) => {
        console.log(error);
    });

// API Routes (these should be hit before the SPA fallback)
app.use("/auth", require("./routes/auth"));
app.use("/notice", require("./routes/notice"));
app.use("/belongings", require("./routes/belongings"));
app.use("/messages", require("./routes/messages"));
app.use("/activity", require("./routes/activity"));
app.use("/gate", require("./routes/gate"));
app.use("/cafe", require("./routes/cafe"));

// 2. SPA Fallback (Catch-all for Angular's routing)
// Any request that isn't an API route or a directly served static file will fall here.
// This ensures your Angular app handles its own internal routing.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'browser', 'index.html'));
});

// 3. Error Handler (Always last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    // For production, send a less detailed error to the client
    res.status(500).send("Something broke on the server!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});