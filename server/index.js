/*var camelCase = require('camelcase');


console.log(camelCase('foo-bar'));*/

var express = require('express');

var app = express();

app.use(express.static('static'));

// Route not found (404)
//Source: https://davidburgos.blog/how-to-handle-404-and-500-errors-on-expressjs/
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
  });
  
    // Listen to port 5000
    app.listen(5000, function () {
        console.log('Dev app listening on port 5000!');
    });




    









