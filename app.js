var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var url = 'mongodb://localhost/bookAPI';

var dbOptions = {
    useMongoClient: true,
    /* other options */
};
var db = mongoose.connect(url, dbOptions);

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
bodyParser.urlencoded();

var bookRouter = require('./src/routes/bookRoutes')();

app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API on port ' + port);
});

app.listen(port, function () {
    console.log('running on port ' + port);
});