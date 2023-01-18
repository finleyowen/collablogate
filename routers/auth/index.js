const { User } = require("../../db");
const router = require("express").Router();
const passport = require("../../passport/setup");
const bcrypt = require("bcryptjs");

router.get("/", function (req, res) {
    res.render("auth/index", { title: "Account" });
});

router.get("/err/:err", function (req, res) {
    res.render("auth/index", { title: "Account", err: req.params.err })
})

router.get("/signup", function (req, res) {
    var { email } = req.query;
    res.render("auth/signup", { title: "Sign up", email });
});

router.get("/login", function (req, res) {
    var { email, name } = req.query;
    res.render("auth/login", { title: "Log in", email, name });
});

router.post(
    "/",
    function (req, res) {
        var { email } = req.body;
        if (email) {
            User.findOne({ email })
                .then(function (user) {
                    if (!user) {
                        return res.redirect(
                            "/auth/signup?" + new URLSearchParams({ email })
                        );
                    } else {
                        return res.redirect(
                            "/auth/login?" +
                                new URLSearchParams({ email, name: user.name })
                        );
                    }
                })
                .catch(function (err) {
                    return res.redirect("/auth");
                });
        }
    }
);

router.post(
    "/signup",
    function (req, res) {
        const { name, email, password, confirmPassword } = req.body;
        if (password == confirmPassword) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            new User({ email, name, password: hash }).save()
                .then(function (document) {
                    res.redirect('/auth/login?' + new URLSearchParams({ name: document.name, email: document.email }))
                })
        } else {
            res.json({ success: false, err: 'Passwords do not match' })
        }
    }
);

router.post(
    "/login", passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureMessage: true
    })
)

module.exports = router;
