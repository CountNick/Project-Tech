/*var camelCase = require('camelcase');


console.log(camelCase('foo-bar'));*/

var express = require('express');

var app = express();

app.use(express.static('static'));

    // Listen to port 5000
    app.listen(5000, function () {
        console.log('Dev app listening on port 5000!');
    });




    









