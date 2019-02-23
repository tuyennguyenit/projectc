var Todos = require("../models/Model_Todos");

//reload
function getTodos(res) {
    Todos.find(function (err, Todos) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(Todos);
        }
    });
}

module.exports = function (app) {

    app.get("/api/Todos", function (req, res) {
        getTodos(res);
    });

    app.get("/api/todo/:id", function (req, res) {
        Todos.findById({
            _id: req.params.id
        }, function (err, todo) {
            if (err) {
                throw err;
            } else {
                res.json(todo);
            }
        })
    });

    /**
     * create todos
     */
    app.post("/api/Todo", function (req, res) {
        var todo = {
            TodoName:req.body.TodoName,
            _idReviewer:req.body._idReviewer,
            Priority:req.body.Priority,
            timeStart:req.body.timeStart,
            timeFinish:req.body.timeFinish,
            Progress:req.body.Progress,
            point:req.body.point,
            status:req.body.status,
            comment:req.body.comment,
            _idProject:req.body._idProject,
            _idMemberJoin:req.body._idMemberJoin
        };
        Todos.create(todo, function (err, todo) {
            if (err) {
                throw err;
            } else {
                getTodos(res);
            }
        })
    });

    /**
     * update
     */
    app.put("/api/Todo", function (req, res) {
        if (!req.body._id) {
            return res.status(500).send("_iD is required");
        } else {
            Todos.update({
                _id: req.body._id
            }, {
                TodoName:req.body.TodoName,
                _idReviewer:req.body._idReviewer,
                Priority:req.body.Priority,
                timeStart:req.body.timeStart,
                timeFinish:req.body.timeFinish,
                Progress:req.body.Progress,
                point:req.body.point,
                status:req.body.status,
                comment:req.body.comment,
                _idProject:req.body._idProject,
                _idMemberJoin:req.body._idMemberJoin
            },function(err,todo){
                if(err){
                    return res.status(500).json(err);
                } else{
                    getTodos(res);
                }
            }
            
            );
        }
    });

    /**
     * delete
     */

     app.delete('/api/Todo/:id',function(req,res){
         Todos.remove({
             _id:req.params.id
         },function(err,todo){
             if(err){
                 return res.status(500).json(err);
             } else{
                 getTodos(res);
             }
         })
     });




}