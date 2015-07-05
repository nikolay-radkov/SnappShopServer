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
    getProductDetails: function (req, res, next) {
        var id = req.params.id;

        Product.findById(id, {_id: 1, background: 1, name: 1, images: 1, typeId: 1}, function (err, product) {
            if (err) {
                console.log('Could not get products: ' + err);
                return;
            }

            Type.findById(product.typeId, {_id: 1, image: 1}, function (err, type) {
                if (err) {
                    console.log('Could not get types: ' + err);
                    return;
                }

                res.send({
                    product: product,
                    type: type
                });
                res.end();
            });
        });
    },
    getProductInfo: function (req, res, next) {
        var id = req.params.id;

        Product.findById(id, function (err, product) {
            if (err) {
                console.log('Could not get product: ' + err);
                return;
            }
            User.findById(product.authorId, {_id: 1, firstName: 1, lastName: 1, avatar: 1}, function (err, user) {
                if (err) {
                    console.log('Could not get user: ' + err);
                    return;
                }

                Type.findById(product.typeId, {_id: 1, image: 1}, function (err, type) {
                    if (err) {
                        console.log('Could not get type: ' + err);
                        return;
                    }

                    res.send({
                        product: product,
                        author: user,
                        type: type
                    });
                    res.end();
                });
            });
        });
    },
    putVote: function (req, res, next) {
        var vote = res.body;
        var id = req.params.id;

        Product.findById(id, function (err, product) {
            if (!product) {
                return next(new Error('Could not load Product'));
            }
            else {
                product.votes.push(vote.value);

                product.save(function (err) {
                    if (err) {
                        res.send({success: false});
                    } else {
                        res.send({success: true});
                    }
                });
            }
        });
    },
    putProductBackground: function (req, res, next) {
        var image = req.body.image;

        Product.findById(req.params.id, function (err, product) {
            if (!product) {
                return next(new Error('Could not load Product'));
            }
            else {
                product.background = image;

                product.save(function (err) {
                    if (err) {
                        res.send({success: false});
                    } else {
                        res.send({success: true});
                    }
                });
            }
        });
    }
}
;