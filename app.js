const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

/** middleware to mock user authentication and role settings */
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (err) {
                return res.status(401).send("Unauthorized");
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);  

app.listen(3000, () => {
    console.log("Server started on port 3000");
});