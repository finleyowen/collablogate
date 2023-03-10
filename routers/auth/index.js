const { User } = require('../../db');
const router = require('express').Router();
const passport = require('../../passport/setup');
const bcrypt = require('bcryptjs');

/* Tests if user is logged in. If true, redirects to the /app route. 
If false, renders a form which asks for the user's email address. */
router.get('/', function (req, res) {
    // True if the user is already logged in
    if (req.user) {
        // See src/routers/app/index.js
        res.redirect('/app')
    } else {
        // See src/views/auth/index.pug
        res.render('auth/index', { title: 'Account' });
    }
});

/*  */
router.post('/', function (req, res) {
    var { email } = req.body;
    if (email) {
        User.findOne({ email })
            .then(function (user) {
                if (!user) {
                    return res.redirect(
                        '/auth/signup?' + new URLSearchParams({ email })
                    );
                } else {
                    return res.redirect(
                        '/auth/login?' +
                            new URLSearchParams({ email, name: user.name })
                    );
                }
            })
            .catch(function (err) {
                return res.redirect('/auth');
            });
    }
});

router.get('/signup', function (req, res) {
    var { email } = req.query;
    res.render('auth/signup', { email });
});

router.get('/login', function (req, res) {
    var { email, name } = req.query;
    res.render('auth/login', { email, name });
});

router.post('/signup', function (req, res) {
    const { name, username, email, password, confirmPassword } = req.body;
    if (password == confirmPassword) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        new User({ email, name, username, password: hash })
            .save()
            .then(function (document) {
                res.redirect(
                    '/auth/login?' +
                        new URLSearchParams({
                            name: document.name,
                            email: document.email,
                        })
                );
            });
    } else {
        res.render('auth/signup', { email, err: 'Passwords did not match' });
    }
});

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/app',
        failureRedirect: '/auth',
        failureMessage: true,
    })
);

module.exports = router;
