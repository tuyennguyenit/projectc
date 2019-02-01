var express= require('express');
var bodyParser=require('body-parser');
var morgan =require('morgan');
var mongoose=require('mongoose');
var config= require('./config');


var multer=require('multer'); //upload file


//add controller
//var setupController=require("./api/controllers/setupController");
//var todoController=require("./api/controllers/todoController")
//var authorController=require("./api/controllers/setupAuthor")

var setup_Todos=require("./api/controllers/setup_Todos")
var Controller_Todos=require("./api/controllers/Controller_Todos")
var setup_Priority=require('./api/controllers/setup_Priority')
var Controller_priority=require("./api/controllers/Controller_Priority")
var setup_Process=require('./api/controllers/setup_Progress')
var Controller_process=require("./api/controllers/Controller_Progress")
var setup_Todohs=require("./api/controllers/setup_TodoHistory")
var Controller_Todohs=require("./api/controllers/Controller_TodoHistory")

var setup_Member=require("./api/controllers/setup_members")
var Controller_Members=require("./api/controllers/controller_Members")
var setup_Reviewer=require("./api/controllers/setup_Reviewer")
var Controller_Reviewer=require("./api/controllers/Controller_Reviewer")
var setup_TagMember=require("./api/controllers/setup_TagMember")
var Controller_TagMember=require("./api/controllers/controller_TagMember")

var setup_Project=require("./api/controllers/setup_Project")
var Controller_Project=require("./api/controllers/Controller_Project")


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
//authorController(app)
//todoController(app);
setup_Todos(app);
Controller_Todos(app);
setup_Priority(app);
Controller_priority(app);
setup_Process(app);
Controller_process(app);
setup_Todohs(app);
Controller_Todohs(app);

setup_Member(app);
Controller_Members(app);
setup_Reviewer(app);
Controller_Reviewer(app);
setup_TagMember(app);
Controller_TagMember(app);
setup_Project(app);
Controller_Project(app);


//dieu huong chay trang
app.get('/',function(req,res){
    res.render("index");
});

app.get('/index1',function(req,res){
    res.render("index1.ejs");
});

app.get('/hi',function(req,res){
    res.send("<font color=red> trang 2</font>")
})
mongoose.connection;

//upload file
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename : function (req,file,cb) {
        cb(null,file.originalname);
       console.log("ten file la:"+file.originalname);
    } 
    
});
var upload=multer({storage:storage})
app.post('/upload',upload.single('file'),function(req,res){
    console.log(req.file);
    res.send("upload thành công!");
});
app.get('/anh',function(req,res){
    res.render('form');
});



app.listen(port,function(){
    console.log("app listening on port:"+port)
})
