var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Type = mongoose.model('Type');

var productSchema = mongoose.Schema({
    name: String,
    description: String,
    location: String,
    price: Number,
    images: [String],
    background: String,
    user: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.ObjectId,
    votes: [mongoose.Schema.Types.ObjectId]
});

var Product = mongoose.model('Product', productSchema);

module.exports.seedInitialProducts = function () {
    Product.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find products ' + err);
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

                Type.find({}).exec(function (err, types) {
                    if (err) {
                        console.log('Cannot find types ' + err);
                    }

                    var typesIds = [];
                    for (var typeIndex in types) {
                        typesIds.push(types[typeIndex]._id);
                    }


                    Product.create({
                        name: 'Coat',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                        price: 2000,
                        images: ['public/coat1.png', 'public/coat2.png', 'public/coat3.png'],
                        background: 'public/coat1.png',
                        user: userIds[0],
                        type: typesIds[0]
                    });

                    Product.create({
                        name: 'Watch',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                        price: 2000,
                        images: ['public/watch1.png', 'public/watch2.png'],
                        background: 'public/clock2.png',
                        user: userIds[0],
                        type: typesIds[1]
                    });

                    console.log('products added to database');
                });
            });
        }
    });
};