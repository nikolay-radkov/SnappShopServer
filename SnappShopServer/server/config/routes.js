var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.post('/register', controllers.users.createUser);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/products', controllers.products.getProducts);
    app.get('/products/:id', controllers.products.getProductDetails);
};