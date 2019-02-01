var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var todoSchema= new Schema({
   _idTodos:Number,
   _idMembersReviews:Number,
   text:String,
   status:Number ,
   _idTag:Number
});
var Todos=mongoose.model("reviewer",todoSchema);
module.exports=Todos;