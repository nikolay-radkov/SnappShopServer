var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Type = mongoose.model('Type'),
    User = mongoose.model('User');

module.exports = {
    getProducts: function (req, res, next) {
        Product.find({}, {
                _id: 1,
                price: 1,
                background: 1,
                votes: 1,
                description: 1,
                authorId: 1,
                typeId: 1
            }, function (err, products) {
                if (err) {
                    console.log('Could not get products: ' + err);
                    return;
                }

                var userIds = [];
                var typeIds = [];

                for (var index in products) {
                    userIds.push(products[index].authorId);
                    typeIds.push(products[index].typeId);
                }

                User.find({
                    _id: {
                        $in: userIds
                    }
                }, {_id: 1, firstName: 1, lastName: 1, avatar: 1}, function (err, users) {
                    if (err) {
                        console.log('Could not get users: ' + err);
                        return;
                    }

                    Type.find({
                        _id: {
                            $in: typeIds
                        }
                    }, {_id: 1, image: 1}, function (err, types) {
                        if (err) {
                            console.log('Could not get types: ' + err);
                            return;
                        }

                        res.send({
                            products: products,
                            users: users,
                            types: types
                        });
                        res.end();

                    });
                });
            }
        );
    },
    getProductDetails: function(req, res, next) {
        var id = req.params['id'];

        Product.find({'_id':id}, { _id: 1, background:1, images:1}, function(err, products){
            if (err) {
                console.log('Could not get products: ' + err);
                return;
            }

            res.send(products);
            res.end();
        });
    },
    getProductInfo: function (req, res, next) {
        //TODO: implement it
    },
    postVote: function (req, res, next) {
        //TODO: implement it
    },
    putProductBackground: function (req, res, next) {
        //TODO: implement it
    }
};