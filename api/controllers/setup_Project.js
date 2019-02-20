/*


var Todos = require("../models/Model_Project");

module.exports = function (app) {
    app.get('/api/setupproject', function (req, res) {
        //setup seed data
        var seedTodos = [{
            name: 'String',
            timeCreate: 'String',
            describe: 'String',
            _idCreator: 'String',
        }];
        Todos.create(seedTodos, function (err, result) {
            res.send(result);
        })
    })
}
 */
var Project = require("../models/Model_Project");
var Member = require("../models/Model_Members.js");
var mongoose=require("mongoose");
var Schema =mongoose.Schema;
module.exports = function (app) {
    app.get('/api/setupproject', function (req, res) {
        
          const member = new Member({
            _id: new mongoose.Types.ObjectId(),
            name:'0String',
           companyName:'0String',
           dateOfBirth:'0String',
           address:'0String',
           avatar:'0String' ,
           tokenfacebook:'0String',
           userName:'0String',
           pass:'0String',
           status:1,
           
            });
  
          member.save(function (err) {
          if (err) return handleError(err)

              const project1 = new Project({
               _id:new mongoose.Types.ObjectId(),
                name:'0String',
                timeCreate:'0String',
                describe:'0String',
                 _idCreator: member._id
               
              });

              project1.save(function (err,result) {
                if (err) return handleError(err);
                // thats it!
                 res.send(result);
              });
        });

    });
}