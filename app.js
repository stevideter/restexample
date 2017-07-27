var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Welcome to my API on port ' + port);
});

app.listen(port, function(){
    console.log('running on port ' + port);
});