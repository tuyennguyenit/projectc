var Author= require('../models/authorModel');

function getAuthors(res){
    Author.find(function(err,authors){
        if(err){
            res.find(function(err,authors){
                if(err){
                    res.status(500).json(err);
                } else{
                    res.json(authors);
                }
            });
        }
    })
}

module.exports=function(app){
    app.get("/api/authors",function(req,res){
        getAuthors(res);
    })

    app.get("/api/author/:id",function(req,res){
        Author.findById({
            _id:req.params.id
        },function(err,author){
            if(err) {
                throw err;
            }
            else{
                res.json(author);
            }
        })
    });
    /**
     * create author
     */
    app.post("/api/author",function(req,res){
        
        var author = new Author({ name: req.body.name, email: req.body.email });
 
        author.save(function (err) {
            if(err) throw err;
            var post = new Post({
                title: req.body.title,
                body: req.body.body,
                _creator: author._id
            });
     
            
        });

        // var author={
        //     name: req.body.name,
        //     age:req.body.age,
        //     books:[{title:req.body.title,numberOfPages:req.body.numberOfPages}]
        // }
    });
    Author.create(author,function(err,author){
        if(err){
            throw err;
        }
        else{
            getAuthors(res);
        }
    });





    
}