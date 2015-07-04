var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        console.log(req.body);
        var auth = passport.authenticate('local', function(err, user) {

            if (err) return next(err);
            if (!user) {
                res.send({success: false});
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.send({success: true, user: user});
            })
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        }
        else {
            next();
        }
    }
};