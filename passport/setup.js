const bcrypt = require('bcryptjs');
const { User } = require('../db');
const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    return done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    'local',
    new LocalStratergy({ usernameField: 'email' }, function verify(
        email,
        password,
        done
    ) {
        User.findOne({ email })
            .then(function (user) {
                if (!user) {
                    return done(null, false, { err: 'No user found' });
                } else {
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, { err: 'Incorrect password' });
                    } else {
                        return done(null, user);
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
                return done(null, false, { err });
            });
    })
);

module.exports = passport;
