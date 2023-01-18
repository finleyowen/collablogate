const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "A blog already exists with this name"],
    },
    secret: {
        type: String,
        required: [true, "You must provide a secret for access to your blog"],
        unique: false,
    },
    creator_id: {
        type: String,
        required: true,
        unique: false,
    },
});

module.exports = BlogSchema;
