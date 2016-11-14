var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./backend/config');
var User = require('./backend/models/user');
var path = require('path');
var app = express();
var apiRoutes = require('./backend/routes/api-routes');

//config
var port = process.env.PORT || 8080;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/build'));



app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.listen(port);