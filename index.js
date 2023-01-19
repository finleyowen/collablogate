require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const authRouter = require('./routers/auth');
const appRouter = require('./routers/app')

const passport = require('./passport/setup');
const { connect, getStore } = require('./db');

const app = express();
const port = 3000;

app.use('/static', express.static('public'));
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
app.use('/auth', authRouter);
app.use(appRouter);

app.set('view engine', 'pug');

connect();

app.listen(port, function () {
    console.log(`Listening on port ${port}.`);
});
