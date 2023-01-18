const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Blog } = require("../../db");

router.post("/create", function (req, res, next) {
    var { name, secret } = req.body;
});

module.exports = router;
