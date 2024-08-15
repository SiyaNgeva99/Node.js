const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt'); // import the bcrypt package in User.js


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
        }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) { //lets us change use data before saving it into the database.
    const user = this  // mongoose makes the UserSchema available via this.
    bcrypt.hash(user.password, 10, (error, hash) => {  //takes in the password to be hashed 10 times
        user.password = hash //replaces the original password with the encrypted version.
        next()
    })
})

// export model
const User = mongoose.model('User', UserSchema);
module.exports = User