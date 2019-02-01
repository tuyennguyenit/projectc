var configValues= require("./config");

console.log(configValues.username);

module.exports={
    getDbConnectionString: function(){
        
          //return "mongodb://"+configValues.username  + ":"+ configValues.password +"@ds161794.mlab.com:61794/todo_test";
          return `mongodb://${configValues.username}:${configValues.password}@ds161794.mlab.com:61794/todo_test`;
    }
}