const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author_id: String,
    author: String,
    title: String,
    text: String,
    date: String
})
module.exports = mongoose.model('Post', postSchema);