var Members=require("../models/Model_Members");

function getMembers(res){
    Members.find(function(err,members){
        if(err) {
            res.status(500).json(err);
        } else{
            res.json(members);
        }
    });
}

module.exports=function(app){
    app.get('/api/members',function(req,res){
        getMembers(res);
    });

    app.get("/api/member/:id",function(req,res){
        Members.findById({
            _id:req.params.id
        },function(err,members){
            if(err){
                throw err;
            } else{
                res.json(members);
            }
        })
    });
    /**
     * create
     */

     app.post("/api/member",function(req,res){
        var member={
            name:req.body.name,
            companyName:req.body.companyName,
            dateOfBirth:req.body.dateOfBirth,
            address:req.body.dateOfBirth,
            avatar:req.body.avatar,
            tokenfacebook:req.body.tokenfacebook,
            userName:req.body.userName,
            pass:req.body.pass,
            status:req.body.status
        }
        Members.create(member,function(err,mebers){
            if(err){
                throw err;
            } else{
                getMembers(res);
            }
        })
     });

     /**
      * update
      */
     app.put("/api/member",function(req,res){
         if(!req.body._id){
             return res.status(500).send("_ID is required");
         } else{
             Members.update({
                 _id:req.body._id
             },{
                name:req.body.name,
                companyName:req.body.companyName,
                dateOfBirth:req.body.dateOfBirth,
                address:req.body.dateOfBirth,
                avatar:req.body.avatar,
                tokenfacebook:req.body.tokenfacebook,
                userName:req.body.userName,
                pass:req.body.pass,
                status:req.body.status
             },function(err,members){
                 if(err) {
                     return res.status(500).json(err);
                 } else{
                     getMembers(res);
                 }
             })
         }
     });

     /**
      * delete
      */

      app.delete('/api/member/:id',function(req,res){
          Members.remove({
              _id:req.params.id
          },function(err,member){
              if(err){
                  return res.status(500).json(err);
              }
              else{
                  getMembers(res);
              }
          })
      });



}