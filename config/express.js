var express = require('express');
module.exports = function() {
    var app = express();

    require('../routes.js')(app);
    return app;
};
