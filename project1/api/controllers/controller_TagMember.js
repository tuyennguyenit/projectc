var TagMember = require("../models/Model_TagMember");

//reload
function getTagMember(res) {
    TagMember.find(function (err, TagMember) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(TagMember);
        }
    });
}

module.exports = function (app) {

    app.get("/api/tagmembers", function (req, res) {
        getTagMember(res);
    });

    app.get("/api/tagmember/:id", function (req, res) {
        TagMember.findById({
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
     * create TagMember
     */
    app.post("/api/tagmember", function (req, res) {
        var todo = {
            _idTodos: req.body._idTodos,
            _idMembers: req.body._idMembers,
            status: req.body.status,
        };
        TagMember.create(todo, function (err, todo) {
            if (err) {
                throw err;
            } else {
                getTagMember(res);
            }
        })
    });

    /**
    
     * update
     */
    app.put("/api/tagmember", function (req, res) {
        if (!req.body._id) {
            return res.status(500).send("_iD is required");
        } else {
            TagMember.update({
                    _id: req.body._id
                }, {
                    _idTodos: req.body._idTodos,
                    _idMembers: req.body._idMembers,
                    status: req.body.status,
                }, function (err, todo) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        getTagMember(res);
                    }
                }

            );
        }
    });

    /**
     * delete
     */

    app.delete('/api/tagmember/:id', function (req, res) {
        TagMember.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err) {
                return res.status(500).json(err);
            } else {
                getTagMember(res);
            }
        })
    });




}