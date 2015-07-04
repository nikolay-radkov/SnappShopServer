var mongoose = require('mongoose'),
    Product = mongoose.model('Product');
module.exports = {
    getProducts: function(req, res, next) {
        Product.find({}, function(err, products) {
            if(err) {
                console.log('Could not get products: ' + err);
                return;
            }

            res.send(products);
            res.end();
        });
    },
    getProductInfo:function(req, res, next) {
        //TODO: implement it
    },
    postVote: function(req, res, next) {
        //TODO: implement it
    }
};