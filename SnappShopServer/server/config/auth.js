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
        res.send({success: true});
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.statusCode(403);
            res.end();
        }
        else {
            next();
        }
    }
};