var Todos = require("../models/Model_Project");

module.exports = function (app) {
    app.get('/api/setupproject', function (req, res) {
        //setup seed data
        var seedTodos = [{
            name:'String',
            timeCreate:'String',
            describe:'String',
            _idCreator:'String',
        }];
        Todos.create(seedTodos, function (err, result) {
            res.send(result);
        })
    })
}