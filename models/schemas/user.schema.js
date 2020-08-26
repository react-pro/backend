const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    avatar: {
        type: String,
    },
    skills: [{
        name: {type: String, required: true},
        level: {type: Number, required: true, default: 0}
    }],
    preference: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);
