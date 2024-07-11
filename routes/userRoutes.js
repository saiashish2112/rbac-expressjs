const express = require("express");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");

router.get('/user', roleMiddleware('user'), (req, res) => {
    res.send('Hello User');
});

module.exports = userRoutes;