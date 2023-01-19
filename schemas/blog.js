const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'A blog already exists with this name'],
    },
    secret: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        default: ""
    },
    creators: {
        type: [String],
        default: []
    }
});

module.exports = BlogSchema;
