const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId, //value is supposed to be a valid Mongo object id.
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;