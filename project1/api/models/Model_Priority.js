var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var prioritySchema= new Schema({
    name:String
});

var Prioritys=mongoose.model("priority",prioritySchema);
module.exports=Prioritys;