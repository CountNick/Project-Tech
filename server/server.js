var express = require('express');
var slug = require('slug');
var bodyParser = require('body-parser');

var app = express();


var data = 

    {
        id: "person1",
        name: "Andrea",
        age: "24",
        bio:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }


app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', 'view/pages');
app.set('view engine', 'ejs');

app.get('/', home);
app.get('/login', login);
app.get('/changeprofile', changeProfile);
app.get('/', changeProfile);
app.post('/', add);
app.use(notFound);


function home(req, res) {
    res.render('index',{
        data: data, 
        pageTitle: data.name + "'s profile"});
}

function login(req, res) {
    res.render('login',{
        pageTitle: "Login"
    });
}

function changeProfile(req, res) {
    res.render('changeprofile',{
        pageTitle: "Change profile"
    });
}


function add(req, res){
    
    //var id = 

    data.name = req.body.name;

    res.redirect('/');
}

function notFound(req, res){
    res.status(404).render('notfound',{
        pageTitle: "404"
    });
}


    // Listen to port 5000
    app.listen(5000, function () {
        console.log('Dev app listening on port 5000!');
    });
