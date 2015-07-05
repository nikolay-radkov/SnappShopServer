var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    env = process.env.NODE_ENV || 'development',
    config = require('../config/config')[env];

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    salt: String,
    hashPass: String,
    avatar: {
        type: String,
        default:config.server + 'anonimous.png'
    }});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            var salt,
                hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({
                username: 'snapp',
                firstName: 'Jack',
                lastName: 'Stathom',
                email: 'jack@stathom.com',
                salt: salt,
                hashPass: hashedPwd,
                avatar: config.server + 'person1.png'
            });

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');

            User.create({
                username: 'tester',
                firstName: 'Test',
                lastName: 'Balboa',
                email: 'test@test.com',
                salt: salt,
                hashPass: hashedPwd,
                avatar: config.server + 'person2.jpg'
            });

            console.log('users added to database');
        }
    });
};