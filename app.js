/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', require('./routes'));

console.log('About to crank up node');

// use static dir if needed

app.start = function() {
    var server = http.createServer(app);

    server.listen(3000, function() {
        var baseUrl = ('http://') + app.get('host') + 
            ':' + app.get('port');
        app.set('url', baseUrl);
        app.emit('started', baseUrl);
        console.log('Express server listening on port ' + app.get('port'));
        console.log('env = ' + app.get('env') +
            '\n__dirname = ' + __dirname  +
            '\nprocess.cwd = ' + process.cwd());
    });

    return server;
};

app.start();
module.exports = app;
