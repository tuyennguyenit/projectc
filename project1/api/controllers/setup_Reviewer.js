var Todos = require("../models/Model_Reviewer");

module.exports = function (app) {
    app.get('/api/setupreviewers', function (req, res) {
        //setup seed data
        var seedTodos = [{
            _idTodos: 1,
            _idMembersReviews: 1,
            text: 'text',
            status: 0,
            _idTag: 1
        }];
        Todos.create(seedTodos, function (err, result) {
            res.send(result);
        })
    })
}