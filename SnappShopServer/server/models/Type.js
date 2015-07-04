var mongoose = require('mongoose');

var typeSchema = mongoose.Schema({
    name: {
        type: String,
        default: "Hat"
    },
    image: String
});

var Type = mongoose.model('Type', typeSchema);


module.exports.seedInitialTypes = function () {
    Type.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find types ' + err);
        }

        if (collection.length === 0) {
            Type.create({
                image: ['public/coat-type.png'],
                name: 'coat'
            });

            Type.create({
                image: ['public/clack-type.png'],
                name: 'clack'
            });

            console.log('types added to database');
        }
    });
};