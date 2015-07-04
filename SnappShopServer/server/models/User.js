var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    salt: String,
    hashPass: String
});

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
                hashPass: hashedPwd
            });

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({
                username: 'tester',
                firstName: 'Test',
                lastName: 'Balboa',
                email: 'test@test.com',
                salt: salt,
                hashPass: hashedPwd
            });

            console.log('users added to database');
        }
    });
};