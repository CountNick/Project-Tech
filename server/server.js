var express = require('express');

var app = express();

app.use(express.static('static'));
app.set('views', 'view/pages');
app.set('view engine', 'ejs');


app.get('/', home);
app.get('/login', login);
app.get('/changeprofile', changeProfile)
app.get('/', form);
app.use(notFound);


function home(req, res) {
    res.render('index',{
        title: "Your profile"
    });
  }

function login(req, res) {
    res.render('login',{
        title: "Login"
    });
}

function changeProfile(req, res) {
    res.render('changeprofile',{
        title: "Change profile"
    });
}

function form(req, res){
    res.render('changeprofile')
}

function notFound(req, res){
    res.status(404).render('notfound',{
        title: "404"
    });
}




// Route not found (404)
//https://expressjs.com/en/starter/faq.html
//app.use(function (req, res, next) {
//    res.status(404).send("Sorry can't find that page!");
//  });

  
    // Listen to port 5000
    app.listen(5000, function () {
        console.log('Dev app listening on port 5000!');
    });
