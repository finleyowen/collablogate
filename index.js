require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const blogRouter = require("./routers/blog");
const postRouter = require("./routers/post");
const authRouter = require("./routers/auth");

const passport = require("./passport/setup");
const { connect, getStore } = require("./db");

const app = express();
const port = 3000;

app.use("/static", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        store: getStore(),
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/blog", blogRouter);
app.use("/post", postRouter);
app.use("/auth", authRouter);
app.set("view engine", "pug");

app.get("/", function (req, res) {
    res.render("index", { title: "Home" });
});

connect();

app.listen(port, function () {
    console.log(`Listening on port ${port}.`);
});
