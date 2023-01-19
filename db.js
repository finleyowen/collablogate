const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const BlogSchema = require('./schemas/blog');
const { UserSchema } = require('./schemas/user');

mongoose.set('strictQuery', false);
const Blog = mongoose.model('Blog', BlogSchema);
const User = mongoose.model('User', UserSchema);
const getStore = () => MongoStore.create({ mongoUrl: process.env.MONGODB_URI });

async function connect() {
    mongoose.connect(process.env.MONGODB_URI);
}

module.exports = {
    Blog,
    User,
    getStore,
    connect,
};
