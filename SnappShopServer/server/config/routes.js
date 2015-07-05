var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.post('/register', controllers.users.createUser);
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/products', controllers.products.getProducts);
    app.get('/products/:id', controllers.products.getProductDetails);
    app.put('/products/:id', controllers.products.putProductBackground);

    app.get('/products/info/:id', controllers.products.getProductInfo);
    app.put('/products/vote/:id', controllers.products.putVote);
};