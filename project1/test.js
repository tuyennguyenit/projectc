var express= require('express');
var bodyParser=require('body-parser');
var morgan =require('morgan');
var mongoose=require('mongoose');
var config= require('./config');

//add controller
var setupController=require("./api/controllers/setupController");
var todoController=require("./api/controllers/todoController")
var authorController=require("./api/controllers/AuthorController")


var app=express();
var port=process.env.port || 3000;

app.use('/assets',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));

app.set('view engine','ejs');
//db info
//console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString());

//setupController(app);
authorController(app)
todoController(app);

app.get('/',function(req,res){
    res.render("index");
});
mongoose.connection;

app.listen(port,function(){
    console.log("app listening on port:"+port)
})
