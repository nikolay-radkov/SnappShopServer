var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.post('/register', controllers.users.postRegister);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/', function(req, res) {
        res.render('index', {currentUser: req.user});
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};