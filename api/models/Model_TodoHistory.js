var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var todoSchema= new Schema({
    text:String,
    _idPriority:Number,
    _idProgress:Number,
    timeUpdate:String, //
    status:Number,
    _idTodo:String
});
var Todos=mongoose.model("TodoHistory",todoSchema);
module.exports=Todos;