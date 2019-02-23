var Todos = require("../models/Model_TodoHistory");

module.exports = function (app) {
    app.get('/api/setupTodohistory', function (req, res) {
        //setup seed data
        var seedTodos = [{
            text: "test",
            _idPriority: 1,
            _idProgress: 1,        
            timeUpdate:' 1 / 1 / 2019', 
            status:0,
            _idTodo: '1'
        }];
        Todos.create(seedTodos, function (err, result) {
            res.send(result);
        })
    })
}