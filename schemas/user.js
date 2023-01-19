const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    id: {
        type: String,
        default: null,
    },
    data: {
        type: String,
        default: null,
    },
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required.'],
        unique: [
            true,
            'The email you entered is already linked to a Collablogate account.',
        ],
    },
    name: {
        type: String,
        required: [true, 'Display name is required.'],
        unique: false,
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: [true, 'The username you entered is taken.']
    },
    password: {
        type: String,
    },
    providers: [ProviderSchema],
});

module.exports = { UserSchema, ProviderSchema };
