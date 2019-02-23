var Prioritys=require("../models/Model_Priority")

function getPrioritys(res){
    Prioritys.find(function(err,prioritys){
        if(err){
            res.status(500).json(err);
        } else{
            res.json(prioritys);
        }
    });
}

module.exports=function(app){

    app.get("/api/prioritys",function(req,res){
        getPrioritys(res);
    });

    app.get("/api/priority/:id",function(req,res){
        Prioritys.findById({
            _id:req.params.id
        },function(err,priority){
            if(err){
                throw err;
            }
            else{
                res.json(priority);
            }
        })
    });

/**
 * create
 */
app.post("/api/priority",function(req,res){
    var priority={
        name:req.body.name
    };
    Prioritys.create(priority,function(err,todo){
        if(err){
            throw err;
        } else{
            getPrioritys(res);
        }
    })
});

/**
 * update
 */
app.put("/api/priority",function(req,res){
    if(!req.body._id){
        return res,status(500).send("_iD is required");
    }else{
        Prioritys.update({
            _id:req.body._id
        },{
            name:req.body.name
        },function(err,priority){
            if(err){
                return res.status(500).json(err);
            }else{
                getPrioritys(res);
            }
        })
    }
});

/**
 * delete
 */

 app.delete('/api/priority/:id',function(req,res){
     Prioritys.remove({
         _id:req.params.id
     },function(err,priority){
         if(err){
             return res.status(500).json(err);
         } else{
             getPrioritys(res);
         }
     })
 });


}