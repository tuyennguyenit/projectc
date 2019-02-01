var Todos = require("../models/Model_TagMember");

module.exports = function (app) {
    app.get('/api/setupTagmember', function (req, res) {
        //setup seed data
        var seedTodos = [{
            _idTodos: req.body._idTodos,
            _idMembers: req.body._idMembers,
            status: req.body.status,
        }];
        Todos.create(seedTodos, function (err, result) {
            res.send(result);
        })
    })
}