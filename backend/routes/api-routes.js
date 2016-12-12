var express = require('express');
var User = require('../models/user');
var Movie = require('../models/movie');
var jwt = require('jsonwebtoken');
var secretString = require('../config').secret;

var apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
    res.json({ message: 'Welcome to API' })
});

apiRoutes.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.json({ success: false, message: 'Please pass username and password.' });
    }

    var userFieldRegexp = /^[a-zA-Z0-9_]{3,25}$/;
    if (!userFieldRegexp.test(req.body.username) || !userFieldRegexp.test(req.body.password)) {
        return res.json({
            success: false,
            message: 'Username and password may only contain "a-z", "A-Z" or "_" and length must be from 3 to 25 characters.'
        });
    }

    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function (err) {
        if (err) {
            return res.json({ success: false, message: 'Username is already taken.' });
        }

        console.log('User saved successfully');
        return res.json({ success: true, message: 'Successful created new user.' });
    });
});

apiRoutes.post('/authenticate', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.json({ success: false, message: 'Please pass username and password.' });
    }

    User.findOne({
        username: req.body.username
    }, (err, user) => {

        if (err) throw err;

        if (!user || user.password != req.body.password) {
            return res.json({
                success: false,
                message: 'Authentication failed. Wrong username or password.'
            });
        }

        var token = jwt.sign({ username: user.username }, secretString, {
            expiresIn: '24h'
        });

        res.json({
            success: true,
            token: token,
            username: user.username
        });

    });
});

//route middleware to check token
apiRoutes.use((req, res, next) => {
    console.log('req.body.token', req.body.token);
    console.log('req.query.token', req.query.token);
    console.log("req.headers['x-access-token']", req.headers['x-access-token']);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secretString, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

apiRoutes.get('/me', (req, res) => {
    var username = req.decoded.username;
    return res.send({
        success: true,
        username: username
    });
})

apiRoutes.post('/user/favorite', (req, res) => {
    console.log(req.body);
    var favorite = req.body.favorite;
    var movieId = req.body.movieId;
    var username = req.decoded.username;

    if (!movieId) {
        return res.status(400).send({
            success: false,
            message: 'Need movieId.'
        });
    }

    User.findOne({ username: username }, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User probably already deleted.'
            });
        }
        var indexOfMovieId = user.favorites.indexOf(movieId);
        console.log(favorite, movieId);

        if (indexOfMovieId >= 0 && !favorite) {
            console.log('del ' + movieId + ' by index: ' + indexOfMovieId);
            user.favorites.pull(movieId);
        }
        if (indexOfMovieId < 0 && favorite) {
            console.log('add ' + movieId);
            user.favorites.push(movieId);
        }

        user.save(function (err) {
            if (err) throw err;

            console.log('User add/delete favorite movie successfully');
            res.json({
                success: true,
                movieId: movieId,
                favorite: favorite
            });
        });
    })
});

apiRoutes.get('/movie/:movieId/account_states', (req, res) => {
    var movieId = req.params.movieId;
    var username = req.decoded.username;

    User.findOne({ username: username }).exec()
        .then(user => {
            if (!user) {
                return res.status(403).send({
                    success: false,
                    message: 'User not found.'
                });
            }

            var indexOfRating = user.ratings.findIndex((val) => val.movieId === movieId);

            return res.json({
                success: true,
                movieId: movieId,
                favorite: user.favorites.indexOf(movieId) >= 0,
                rating: indexOfRating >= 0 ? user.ratings[indexOfRating].rating : null
            });
        });
});

apiRoutes.post('/movie/:movieId/rating', (req, res) => {
    var movieId = req.params.movieId;
    var userRating = Number(req.body.value);
    var username = req.decoded.username;

    console.log('POST /movie/' + movieId + '/rating', 'value:', userRating, 'user:', username);

    if (userRating < 1 && userRating > 10) {
        return res.json({
            success: false,
            message: '1 <= value <= 10'
        });
    }

    var isNewRaiting = true;
    User.findOne({ username: username }).exec()
        .then(user => {
            console.log('promise user found');
            console.log('userRating:', userRating, 'isNewRaiting:', isNewRaiting);
            var index = user.ratings.findIndex((val) => val.movieId === movieId);
            console.log('index:', index);
            if (index >= 0) {
                userRating -= user.ratings[index].rating;
                user.ratings[index].rating += userRating;
                isNewRaiting = false;
            } else {
                user.ratings.push({ movieId: movieId, rating: userRating });
            }
            return user.save();
        })
        .then(() => {
            console.log('promise user save');
            console.log('userRating:', userRating, 'isNewRaiting:', isNewRaiting);
            return Movie.findOne({ movieId: movieId }).exec();
        })
        .then(movie => {
            console.log('promise movie found');
            if (!movie) {
                movie = new Movie({
                    movieId,
                    rating: {
                        sum: userRating,
                        countOfRatings: 1
                    }
                });
            } else {
                console.log('movie:', movie);
                movie.rating.sum += userRating;
                if (isNewRaiting) {
                    movie.rating.countOfRatings++;
                }
            }

            return movie.save();
        })
        .then(() => {
            console.log('promise movie save');
            res.json({
                success: true,
                message: 'Rating added'
            });

        })
        .catch(err => {
            console.log('promise error', err);
        });


});

apiRoutes.delete('/movie/:movieId/rating', (req, res) => {
    var movieId = req.params.movieId;
    var username = req.decoded.username;
    var userRating = 0;

    console.log('DELETE /movie/' + movieId + '/rating', 'user:', username);

    User.findOne({ username: username }).exec()
        .then(user => {
            console.log('promise user found');
            var index = user.ratings.findIndex((val) => val.movieId === movieId);
            console.log('index:', index);
            if (index >= 0) {
                userRating = user.ratings[index].rating;
                user.ratings.splice(index, 1);
            } else {
                return Promise.reject(0);
            }
            return user.save();
        })
        .then(() => {
            console.log('promise user save');
            return Movie.findOne({ movieId: movieId }).exec();
        })
        .then(movie => {
            console.log('promise movie found');
            if (!movie) {
                return Promise.reject(0);
            } else {
                console.log('movie:', movie);
                movie.rating.sum -= userRating;
                movie.rating.countOfRatings--;
            }

            return movie.save();
        })
        .then(() => {
            console.log('promise movie save');
            res.json({
                success: true,
                message: 'Rating deleted'
            });

        })
        .catch(err => {
            if (err === 0) {
                console.log('do not need to delete');
                res.json({
                    success: true,
                    message: 'Rating deleted'
                });
            }
            console.log('promise error', err);
        });

});

apiRoutes.get('/users', (req, res) => {

    User.find({}, (err, users) => {
        res.json(users);
    });
});



module.exports = apiRoutes;