var Members = require("../models/Model_Members");

module.exports = function (app) {
    //setup
    app.get('/api/setupMembers', function (req, res) {
        var seedMembers = [{
            name: 'text',
            companyName: 'String',
            dateOfBirth: 'String',
            address: 'String',
            avatar: 'String',
            tokenfacebook: 'String',
            userName: 'String',
            pass: 'String',
            status: 1
        }];
        Members.create(seedMembers, function (err, result) {
            res.send(result);
        })
    })

}