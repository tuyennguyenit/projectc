var progresss=require("../models/Model_Progress")

function getprogresss(res){
    progresss.find(function(err,progresss){
        if(err){
            res.status(500).json(err);
        } else{
            res.json(progresss);
        }
    });
}

module.exports=function(app){

    app.get("/api/progresss",function(req,res){
        getprogresss(res);
    });

    app.get("/api/progress/:id",function(req,res){
        progresss.findById({
            _id:req.params.id
        },function(err,progress){
            if(err){
                throw err;
            }
            else{
                res.json(progress);
            }
        })
    });

/**
 * create
 */
app.post("/api/progress",function(req,res){
    var progress={
        name:req.body.name
    };
    progresss.create(progress,function(err,todo){
        if(err){
            throw err;
        } else{
            getprogresss(res);
        }
    })
});

/**
 * update
 */
app.put("/api/progress",function(req,res){
    if(!req.body._id){
        return res,status(500).send("_iD is required");
    }else{
        progresss.update({
            _id:req.body._id
        },{
            name:req.body.name
        },function(err,progress){
            if(err){
                return res.status(500).json(err);
            }else{
                getprogresss(res);
            }
        })
    }
});

/**
 * delete
 */

 app.delete('/api/progress/:id',function(req,res){
     progresss.remove({
         _id:req.params.id
     },function(err,progress){
         if(err){
             return res.status(500).json(err);
         } else{
             getprogresss(res);
         }
     })
 });


}