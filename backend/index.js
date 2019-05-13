/*var camelCase = require('camelcase');


console.log(camelCase('foo-bar'));*/

const express = require('express');

const app = express();

//app.use(express.static('./public'))
app.use(express.static(__dirname + '/public'));
    
    app.get('/', function (req, res) {
        res.send('Dit is de homepagina');
    });

    app.get('/login', function (req, res) {
        res.send('Dit is de homepagina');
    });

    // Listen to port 5000
    app.listen(5000, function () {
        console.log('Dev app listening on port 5000!');
    });





