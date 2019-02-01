var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var prioritySchema= new Schema({
    name:String
});

var Progress=mongoose.model("progress",prioritySchema);
module.exports=Progress;