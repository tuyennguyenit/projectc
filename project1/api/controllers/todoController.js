var Todos = require("../models/todoModel");

//reload - đọc lại csdl => viết cho phía dưới dùng
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

    //get all todos
    app.get("/api/todos", function (req, res) {
        getTodos(res);
    });

    //get truyen tham so id
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
     * create todo 
     */
    app.post("/api/todo", function (req, res) {
        var todo = {
            text: req.body.text,
            isDone: req.body.isDone
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
     * update a todo
     */
    app.put("/api/todo", function (req, res) {
        
        //neu req ko chua id
        if (!req.body._id) {
            return res.status(500).send('ID is required');
        } else {
            Todos.update({
                    _id: req.body._id
                }, {
                    text: req.body.text,
                    isDone: req.body.isDone
                }, function (err, todo) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        getTodos(res);
                    }
                }

            )
        }
        //console.log("haha put ok");
    });
    /**
     * delete a todo
     */
    app.delete("/api/todo/:id", function (req, res) {
        Todos.remove({
                _id: req.params.id
            },function (err, todo) {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    getTodos(res);
                }
            })
    });

}