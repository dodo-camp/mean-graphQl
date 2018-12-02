const serviceLocator = require('@lib/service_locator');
const mongoose = serviceLocator.get('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { strict: true });

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.validPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) throw err;
            resolve(isMatch);
        });
    });
};

module.exports = mongoose.model('Users', userSchema);