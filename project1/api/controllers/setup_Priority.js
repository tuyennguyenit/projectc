var Priority = require("../models/Model_Priority");

module.exports = function (app) {
    app.get('/api/setupprioritys', function (req, res) {
        var seedPrioritys = [{
            name: "text"
        }];
        Priority.create(seedPrioritys, function (err, result) {
            res.send(result);
        })
    })
}