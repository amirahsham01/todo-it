const port = process.env.PORT || 5000;

// require all dependencies
require('dotenv').config
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

// add all middleware
require("./config/db");
app.use(express.json());
app.use(express.static("frontend/build"))
app.use(cors());

// setup my routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/todos", require("./routes/todo.route"));
app.use("/api/todos/comments", require("./routes/comment.route"));


// 404 errors
// app.get("*", (req, res) => {
//     res.status(404).json({ message: "looks like you're lost", code: "EB404" });
// });

//added some more
app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
});

// setup the server port
app.listen(process.env.PORT, () =>
    console.log(`running on ${process.env.PORT}`)
)