var express = require('express');
//var router = express.Router();
var router = express();
var path = require('path');
var User = require.main.require('./models/user');
var Folder = require.main.require('./models/folder');
var dbConfig = require.main.require('./db');
var mongoose = require('mongoose');
// Connect to DB
var cookieParser = require('cookie-parser');
mongoose.connect(dbConfig.url);
var session = require('express-session');
//show images
//var path = require('path');
//router.use(express.static(path.join(__dirname, 'public')));


//Home
router.get('/', function(req, res) {
  console.log("call to index...");
  if(req.session.email==null){
  res.render('index');
}else
{
  Folder.find({email:req.session.email}, function(err, folders) {
  if (err) throw err;

  // object of all the users
  console.log(folders);
  res.render('folders', {folders:folders});
});

}
});




//Logout
router.get('/signout', function(req, res) {
  console.log("call to index...");
  req.session.destroy();
  res.render('index');
});




//Sign Up
router.post('/signup', function(req, res) {
console.log("call to signup post");
var un = req.body.email;
var pwd =req.body.password;

User.findOne({ email: un }, function(err, user) {
  if (err) throw err;
  else
  {
  	if(user==null)
  	{

  		var newUser = User({email:  req.body.email,
              password: req.body.password,
              name:'1',
              avatar:'1'
              
  					});
		// save the user
		newUser.save(function(err) {
  		if (err) throw err;
  			console.log('User created!');
		});
		res.render('index',{"message" :"Create User Successfully. Please Login"});
  	}
  	else
  	{	console.log("user exists");
		res.render('index',{"message" :"User already exists."})
  	}
  }
});
});




//Sign In
router.post('/signin', function(req, res) {
console.log("call to signin post");
var un = req.body.email;
var pwd =req.body.password;
var exists= User.findOne({ email: un , password:pwd }, function(err, user) {
  if (err) throw err;
  else
  {
  	if(user==null)
  	{
		res.render('index',{"message" :"Login Failed"});
  	}
  	else
  	{	req.session.email=un;
  		console.log("user exists");

      //tìm kiếm trong folder các folder có email là un
  		Folder.find({email:un}, function(err, folders) {
  if (err) throw err;

  // object of all the users
  console.log(folders);
  //res.render('folders/1', {folders:folders});
  //load lại trang 1
  getLoadFolder(req,res)
 

});
		
  	}
  }
});
});

//get profile 
router.get('/profile', function(req, res) {
	console.log("call to folders.."+req.session.email);
if(req.session.email!=null){

   User.find({email:req.session.email}, function(err, user) {
  if (err) throw err;

  // object of all the users
  console.log(user);
  res.render('user', {user: user});
});
}
else
{
  res.render('index',{"message" :"Login to continue"});
}
});

//upload file
var multer=require('multer');

var storage= multer.diskStorage({
    destination : function (req,file,cb) { 
        cb(null,'./public/upload') //đường đẫn
     },
     filename : function (req,file,cb) { 
         cb(null,file.originalname)
      }
});

var upload= multer({storage:storage})
//round /upload
router.post('/upload',upload.single('file'),function(req,res){
    console.log("zzz");
    res.send("upload thanh cong!");
    //res.render('form');
});

//round bình thường là render tới form.html
router.get('/up',function(req,res){
    res.render('uploadfile')
});

//upload image profile 
router.post('/profile/upload',upload.single('file'), function(req, res) {
   console.log(req.file.originalname)
    User.update({
      email: req.session.email
  }, {
    avatar: req.file.originalname
  }, function (err, folders) {
      if (err) {
          return res.status(500).json(err);
      } else {
        User.find({email:req.session.email}, function(err, user) {
          if (err) throw err;
        
          res.render('user', {user:user});
        });
       
      }
  }

);

 
});

//edit profile 
router.post('/profile/edit', function(req, res) {
  var pass=req.body.password,
      name=req.body.name
    User.update({
      email: req.session.email
  }, {
    password: pass,
    name: name,
  }, function (err, folders) {
      if (err) {
          return res.status(500).json(err);
      } else {
        User.find({email:req.session.email}, function(err, user) {
          if (err) throw err;
        
          res.render('user', {user:user});
        });
       
      }
  }

); 
});






//Get Folders => phan trang
// router.get('/folders', function(req, res) {
// 	console.log("call to folders.."+req.session.email);
// if(req.session.email!=null){

//    Folder.find({email:req.session.email}, function(err, folders) {
//   if (err) throw err;

//   // object of all the users
//   console.log(folders);
//   res.render('folders', {folders:folders});
// });

// }
// else
// {
//   res.render('index',{"message" :"Login to continue"});
// }


// });

router.get('/folderspage/:page', (req, res, next) => {

  if(req.session.email!=null){
  let perPage = 3;
  let page = req.params.page || 1;

  Folder
    .find({ email:req.session.email }) // finding all documents
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .exec((err, folder) => {
      console.log('xxxxxxx'+folder.size)
      Folder.find({ email:req.session.email }) .count((err, count) => { // count to calculate the number of pages
        if (err) return next(err);
        res.render('folders', {
          folders:folder,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
  } else{
    res.render('index',{"message" :"Login to continue"});
  }
});

/// viết 1 hàm để load đc trang dùng chung
//hàm này load page 1
function getLoadFolder(req,res) {
  let perPage = 3;
  let page =1 || 1;

  Folder
    .find({ email:req.session.email }) // finding all documents
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .exec((err, folder) => {
      console.log('load page:'+folder)
      Folder.find({ email:req.session.email }).count((err, count) => { // count to calculate the number of pages
        if (err) return next(err);
        res.render('folders', {
          folders:folder,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
}
//function load  => tam thoi giai quyet loi o edit tasks
function getLoadTasks(req,res){
  if(req.session.email!=null){
    console.log("call to load tasks.."+req.params.folderName);
      
    Folder.findOne({email:req.session.email, name:req.params.foldername }
          , function(err, folder) {
            if (err) throw err;
  console.log(folder);
            res.render('tasks', {folder:folder});
  });
      }
       else
  {
    res.render('index',{"message" :"Login to continue"});
  }
}

//Create Folders
router.post('/folders', function(req, res) {
  var name = req.body.folderName;
  var describe= req.body.folderDescribe;
  if(req.session.email!=null){
Folder.findOne({ name: name }, function(err, folder) {
  if (err) throw err;
  else
  {
  	if(folder==null)
  	{
var email=req.session.email;
  		var newFolder = Folder({
              name:name,
  					  email:email,
  					  created: Date(),
              tasks: [],
              describe:describe,
              members:[]
  					});
		// save the user
		newFolder.save(function(err) {
  		if (err) {console.log(err); throw err;} 
        console.log('Folder created!!');
        getLoadFolder(req,res)
		});
		  
  //res.render('folders', {folders:folders});
  

  	}
  	else
  	{	console.log("folder exists");
		res.render('folders',{"message" :"Folder name already exists."})
  	}
  }
});
}
else
{
  res.render('index',{"message" :"Login to continue"});
}
});

//Delete Folder
router.get('/folders/delete/:folderName?', function(req, res) {
  console.log("call to tasks.."+req.params.folderName);
  
  if(req.session.email!=null){
  	Folder.remove({ email: req.session.email, name:req.params.folderName }, function(err) {
    if (err) {
          console.log("Error in delete"+err);  
    }
    else {
  

  //res.render('folders', {folders:folders});
  getLoadFolder(req,res)
            
    }
});
  }
  else
{
  res.render('index',{"message" :"Login to continue"});
}

});

//edit Folder
router.get('/folders/edit', function(req, res) {

  var query = require('url').parse(req.url,true).query;

    Folder.update({
      email: req.session.email, name:query.folderName
  }, {
    describe:query.folderDescribe,
   
  }, function (err, folders) {
      if (err) {
          return res.status(500).json(err);
      } else {
        // Folder.find({email:req.session.email}, function(err, folders) {
        //   if (err) throw err;
        
        //   //res.render('folders', {folders:folders});
        // });
        getLoadFolder(req,res)
      }
  }

);

 
});


//Get Tasks of a folders
router.get('/folders/:folderName?', function(req, res) {
  if(req.session.email!=null){
	console.log("call to tasks.."+req.params.folderName);
  	
    	Folder.findOne({email:req.session.email, name:req.params.folderName }
    		, function(err, folder) {
  				if (err) throw err;
console.log(folder);
  				res.render('tasks', {folder:folder});
});
    }
     else
{
  res.render('index',{"message" :"Login to continue"});
}

});

//Create Tasks
router.post('/tasks/:foldername', function(req, res) {
  if(req.session.email!=null){
  var email=req.session.email;
	console.log("call to create tasks.."+req.params.foldername+req.body.taskName);

  Folder.findOneAndUpdate( { email:req.session.email, name:req.params.foldername }, 
    {$push: {"tasks": {tname: req.body.taskName,progress:'0',_idUserMember:req.body._idUserMember,_idUserReviewer:req.body._idUserReviewer,priority:req.body.priority }}},
   {new: true},
    function(err, folder) {
  if (err){
    console.log("Error on task save "+err); throw err;
  }
// we have the updated user returned to us
console.log("Updated "+folder);
res.render('tasks', {folder:folder});
  });}
      else
{
  res.render('index',{"message" :"Login to continue"});
} 
});


//edit Tasks
router.post('/tasks/edit/:foldername/:_idtask', function(req, res) {
  if(req.session.email!=null){
  var email=req.session.email;
  console.log("call to edit tasks.."+req.params.foldername);
    
  Folder.update({email: req.session.email, name:req.params.foldername,'tasks._id': req.params._idtask},
   {
  "tasks.$.tname": req.body.taskName,
  "tasks.$.progress":req.body.progress,
  "tasks.$._idUserMember":req.body._idUserMember,
  "tasks.$._idUserReviewer":req.body._idUserReviewer,
  "tasks.$.priority":req.body.priority 
  },{new: true}, function (err, folder) {
    if (err) {
      console.log("Error on task save "+err); throw err;
    }
    
    //getLoadTasks(req,res)
    //load lại data folder
        Folder.findOne({email:req.session.email, name:req.params.foldername }
          , function(err, folder) {
            if (err) throw err;
            console.log('lan 2'+folder);
            res.render('tasks', {folder:folder});
    });
  });

  }
        else
  {
    res.render('index',{"message" :"Login to continue"});
  } 
});


//Delete tasks
router.get('/folders/delete/:folderName/:taskName', function(req, res) {
if(req.session.email!=null){
  var temail =req.session.email;
  console.log("call to delte tasks......"+temail+req.params.folderName+req.params.taskName);



  Folder.findOneAndUpdate( { email:temail, name:req.params.folderName }, {$pull: {"tasks": {tname: req.params.taskName}}},
   {new: true},
    function(err, folder) {
    if (err){
      console.log("Error on task save "+err); throw err;
    }
      // we have the updated user returned to us
      console.log("Updated "+folder);
      res.render('tasks', {folder:folder});
  }); 
    }
     else
{
  res.render('index',{"message" :"Login to continue"});
}    
});

// router.get('/folders/delete/:folderName/:taskName', function (req, res) {
//   if(req.session.email!=null){
//     var temail =req.session.email;
//     var task=req.params.taskName
//     Folder.remove({
//       email:temail, name:req.params.folderName,tasks:task
//   }, function (err, folder) {
//       if (err) {
//           return res.status(500).json(err);
//       } else {
//         res.render('tasks', {folder:folder});
//       }
//   })
//   }
// });

//add members vào folder
router.post('/members/add/:foldername', function(req, res) {
  if(req.session.email!=null){
  var email=req.session.email;
	console.log("call to create tasks.."+req.params.foldername+req.body.taskName);

  Folder.findOneAndUpdate( { email:req.session.email, name:req.params.foldername }, 
    {$push: {"members": {mName: req.body.mName,address:req.body.address }}},
   {new: true},
    function(err, folder) {
  if (err){
    console.log("Error on member add  "+err); throw err;
  }
// we have the updated user returned to us
console.log("Updated "+folder);
res.render('tasks', {folder:folder});
  });}
      else
{
  res.render('index',{"message" :"Login to continue"});
} 
});


//Delete member
router.get('/members/delete/:folderName/:id', function(req, res) {
  if(req.session.email!=null){
    var temail =req.session.email;
    console.log("call to delte members......"+temail+req.params.folderName);
    Folder.findOneAndUpdate( { email:temail, name:req.params.folderName }, {$pull: {"members": {_id: req.params.id}}},
     {new: true},
      function(err, folder) {
    if (err){
      console.log("Error on task save "+err); throw err;
    }
      // we have the updated user returned to us
    console.log("Updated "+folder);
    res.render('tasks', {folder:folder});
      }); 
        }
        else
    {
      res.render('index',{"message" :"Login to continue"});
    }    
    });
    



module.exports = router;
