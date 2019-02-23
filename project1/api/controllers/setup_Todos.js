var Todos = require("../models/Model_Todos");

module.exports = function (app) {
    app.get('/api/setupTodos', function (req, res) {
        //setup seed data
        var seedTodos = [{
            TodoName:'String',
            _idReviewer:'String',
            Priority:1,
            timeStart:'String',
            timeFinish:'String',
            Progress:1,
            point:1,
            comment:'String',
            _idProject:'Number',
            _idMemberJoin:'Number',
            status:0
        }];
        Todos.create(seedTodos, function (err, result) {
            res.send(result);
        })
    })
}