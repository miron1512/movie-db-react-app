var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Movie', new Schema({

    movieId: String,
    rating: {
        sum: { type: Number, default: 0 },
        countOfRatings: { type: Number, default: 0 }
    },
    reviews: [{
        username: String,
        content: String
    }]

}));