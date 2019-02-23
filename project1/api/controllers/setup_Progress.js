var Priority = require("../models/Model_Progress");

module.exports = function (app) {
    app.get('/api/setupprogresss', function (req, res) {
        var seedPrioritys = [{
            name: "text"
        }];
        Priority.create(seedPrioritys, function (err, result) {
            res.send(result);
        })
    })
}