var Todos = require("../models/todoModel");

module.exports = function (app) {
    app.get('/api/setupTodos', function (req, res) {
        //setup seed data
        var seedTodos = [{
                text: "hoc node.js",
                isDone: false
            },
            {
                text: "hoc angular.js",
                isDone: false
            },
            {
                text: "viet ung dung",
                isDone: false
            }
        ];
        Todos.create(seedTodos, function (err, result) {
            res.send(result);
        });
    });

}