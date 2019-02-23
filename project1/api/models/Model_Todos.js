var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var todoSchema= new Schema({
    TodoName:String,
    _idReviewer:String,
    Priority:Number,
    timeStart:String,
    timeFinish:String,
    Progress:Number,
    point:Number,
    status:Number,
    comment:String,
    _idProject:String,
    _idMemberJoin:String
    
});
var Todos=mongoose.model("Todo1",todoSchema);
module.exports=Todos;