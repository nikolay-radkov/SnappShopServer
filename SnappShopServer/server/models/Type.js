var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../config/config')[env],
    serverDirectory = config.server + 'public/';


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
                image: [serverDirectory + 'coat-type.png'],
                name: 'coat'
            });

            Type.create({
                image: [serverDirectory + 'watch-type.png'],
                name: 'watch'
            });

            console.log('types added to database');
        }
    });
};