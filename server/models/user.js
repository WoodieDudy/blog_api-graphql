const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    secondName: String,
    mail: String,
    avatar: String
})
module.exports = mongoose.model('User', userSchema);