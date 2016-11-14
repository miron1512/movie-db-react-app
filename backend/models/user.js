var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    ratings: [{
        movieId: String,
        rating: { type: Number, min: 1, max: 10 }
    }],
    favorites: [String],
    reviews: [String]
});

module.exports = mongoose.model('User', UserSchema);