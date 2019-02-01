var Reviews = require("../models/Model_Reviewer");

//reload
function getReviews(res) {
    Reviews.find(function (err, Reviews) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(Reviews);
        }
    });
}

module.exports = function (app) {

    app.get("/api/reviewers", function (req, res) {
        getReviews(res);
    });

    app.get("/api/reviewer/:id", function (req, res) {
        Reviews.findById({
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
     * create Reviews
     */
    app.post("/api/reviewer", function (req, res) {
        var todo = {
            _idTodos: req.body._idTodos,
            _idMembersReviews: req.body._idMembersReviews,
            text: req.body.text,
            status: req.body.status,
            _idTag: req.body._idTag
        };
        Reviews.create(todo, function (err, todo) {
            if (err) {
                throw err;
            } else {
                getReviews(res);
            }
        })
    });

    /**
     * update
     */
    app.put("/api/reviewer", function (req, res) {
        if (!req.body._id) {
            return res.status(500).send("_iD is required");
        } else {
            Reviews.update({
                    _id: req.body._id
                }, {
                    _idTodos: req.body._idTodos,
                    _idMembersReviews: req.body._idMembersReviews,
                    text: req.body.text,
                    status: req.body.status,
                    _idTag: req.body._idTag
                }, function (err, todo) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        getReviews(res);
                    }
                }

            );
        }
    });

    /**
     * delete
     */

    app.delete('/api/reviewer/:id', function (req, res) {
        Reviews.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err) {
                return res.status(500).json(err);
            } else {
                getReviews(res);
            }
        })
    });




}