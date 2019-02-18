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


    /**
     * phan trang
     */

    app.post('/phantrang', function(req, res, next) {

        // console.log(req.body);
    
        if(req.body.select!='undefined'){
            var sort=req.body.select;
        }
    
        var perPage = 2
        var page = req.body.page || 1
    
        var search = req.body.search;
        // console.log(req.body.search);
        // console.log(req.body.search_field);
    
        if (req.body.search!=undefined && req.body.search_field!=undefined && req.body.search!='' && req.body.search_field!='') {
          
            var search = req.body.search;
            var search_field = req.body.search_field;
            var query = { 'search' : search_field };
    
            if (search == 'name') {
                var query = { name : search_field };
            }else if (search == 'timeCreate') {
                var query = { timeCreate : search_field };
            }else if (search == 'describe') {
                var query = { describe : search_field };
            }else{
                var query = { id : search_field };
            }
            console.log(query);
        }else{
            var query = { 'name': { $ne: null } };
            console.log(query)
        }
        
        User.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
        .exec(function(err, user) {
                User.count(query).exec(function(err, count) {
                    if (err) return next(err)
                    res.render('user', {
                        user: user,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        sort:sort,
                        search:search,
                        moment:moment
                    })
                })
            })
    })

}