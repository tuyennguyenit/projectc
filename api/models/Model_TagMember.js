var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var todoSchema= new Schema({
   _idTodos:String,
   _idMembers:String,
   status:Number,
  
});
var Todos=mongoose.model("TagMembers",todoSchema);
module.exports=Todos;