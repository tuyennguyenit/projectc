var mongoose=require("mongoose");
var Schema =mongoose.Schema;
var todoSchema= new Schema({
    name:String,
    timeCreate:String,
    describe:String,
    _idCreator:String,
    
});
var Todos= mongoose.model("project",todoSchema);

module.exports=Todos;
