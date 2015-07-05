var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Type = mongoose.model('Type'),
    env = process.env.NODE_ENV || 'development',
    config = require('../config/config')[env];

var productSchema = mongoose.Schema({
    name: String,
    description: String,
    location: String,
    price: Number,
    images: [String],
    authorId: mongoose.Schema.Types.ObjectId,
    background: String,
    typeId: mongoose.Schema.Types.ObjectId,
    votes: [Boolean]
});

var Product = mongoose.model('Product', productSchema);

module.exports.seedInitialProducts = function () {
    Product.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find products ' + err);
        }

        Type.find({}).exec(function (err, types) {
            if (err) {
                console.log('Cannot find types ' + err);
            }
            Type.find({}).exec(function (err, types) {
                if (err) {
                    console.log('Cannot find types ' + err);
                }
                var typesIds = [];
                for (var typeIndex in types) {
                    typesIds.push(types[typeIndex]._id);
                }

                if (collection.length === 0) {
                    User.find({}).exec(function (err, users) {
                        if (err) {
                            console.log('Users not found' + err);
                        }

                        var userIds = [];
                        for (var userIndex in users) {
                            userIds.push(users[userIndex]._id);
                        }

                        Product.create({
                            name: 'Coat',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                            price: 2000,
                            location: 'Irish dolche shop best clothes',
                            images: [config.server + 'coat1.jpg', config.server + 'coat2.jpg', config.server + 'coat3.jpg'],
                            background: config.server + 'coat1.jpg',
                            authorId: userIds[0],
                            typeId: typesIds[0],
                            votes: [false, true, true, false, false, false, true, false, false, false]
                        });

                        Product.create({
                            name: 'Watch',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                            price: 2000,
                            location: 'Bulgarian audemars piguet replica shop',
                            images: [config.server + 'watch1.jpg', config.server + 'watch2.jpg'],
                            background: config.server + 'watch2.jpg',
                            authorId: userIds[0],
                            typeId: typesIds[1],
                            votes: []
                        });

                        console.log('products added to database');
                    });
                }
            });
        });
    });
};