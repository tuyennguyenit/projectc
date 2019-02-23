var Todohs = require("../models/Model_TodoHistory");

//reload
function getTodohs(res) {
    Todohs.find(function (err, Todohs) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(Todohs);
        }
    });
}

module.exports = function (app) {

    app.get("/api/Todohs", function (req, res) {
        getTodohs(res);
    });

    app.get("/api/Todoh/:id", function (req, res) {
        Todohs.findById({
            _id: req.params.id
        }, function (err, Todoh) {
            if (err) {
                throw err;
            } else {
                res.json(Todoh);
            }
        })
    });

    /**
     * create Todohs
     */
    app.post("/api/Todoh", function (req, res) {
        var Todoh = {
            text: req.body.text,
            _idPriority: req.body._idPriority,
            _idProgress: req.body._idProgress,
            timeUpdate: req.body.timeUpdate,
            status: req.body.status,
            _idTodo: req.body._idTodo
        };
        Todohs.create(Todoh, function (err, Todoh) {
            if (err) {
                throw err;
            } else {
                getTodohs(res);
            }
        })
    });

    /**
     * update
     */
    app.put("/api/Todoh", function (req, res) {
        if (!req.body._id) {
            return res.status(500).send("_iD is required");
        } else {
            Todohs.update({
                    _id: req.body._id
                }, {
                    text: req.body.text,
                    _idPriority: req.body._idPriority,
                    _idProgress: req.body._idProgress,
                    timeUpdate: req.body.timeUpdate,
                    status: req.body.status,
                    _idTodo: req.body._idTodo
                }, function (err, Todoh) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        getTodohs(res);
                    }
                }

            );
        }
    });

    /**
     * delete
     */

    app.delete('/api/Todoh/:id', function (req, res) {
        Todohs.remove({
            _id: req.params.id
        }, function (err, Todoh) {
            if (err) {
                return res.status(500).json(err);
            } else {
                getTodohs(res);
            }
        })
    });




}