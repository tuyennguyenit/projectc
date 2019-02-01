var Projects = require("../models/Model_Project");

//reload
function getProjects(res) {
    Projects.find(function (err, Projects) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(Projects);
        }
    });
}

module.exports = function (app) {

    app.get("/api/Projects", function (req, res) {
        getProjects(res);
    });

    app.get("/api/Project/:id", function (req, res) {
        Projects.findById({
            _id: req.params.id
        }, function (err, Project) {
            if (err) {
                throw err;
            } else {
                res.json(Project);
            }
        })
    });

    /**
     * create Projects
     */
    app.post("/api/Project", function (req, res) {
        var Project = {
            name: req.body.name,
            timeCreate: req.body.timeCreate,
            describe: req.body.describe,
            _idCreator: req.body._idCreator,
        };
        Projects.create(Project, function (err, Project) {
            if (err) {
                throw err;
            } else {
                getProjects(res);
            }
        })
    });

    /**
     * update
     */
    app.put("/api/Project", function (req, res) {
        if (!req.body._id) {
            return res.status(500).send("_iD is required");
        } else {
            Projects.update({
                    _id: req.body._id
                }, {
                    name: req.body.name,
                    timeCreate: req.body.timeCreate,
                    describe: req.body.describe,
                    _idCreator: req.body._idCreator,
                }, function (err, Project) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        getProjects(res);
                    }
                }

            );
        }
    });

    /**
     * delete
     */

    app.delete('/api/Project/:id', function (req, res) {
        Projects.remove({
            _id: req.params.id
        }, function (err, Project) {
            if (err) {
                return res.status(500).json(err);
            } else {
                getProjects(res);
            }
        })
    });




}