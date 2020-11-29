const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: String,
    parent_id: String,
    author_id: String,
    text: String,
    date: String,
    answers_id: [String]
})
module.exports = mongoose.model('Comment', commentSchema);