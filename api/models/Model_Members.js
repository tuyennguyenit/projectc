var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var todoSchema= new Schema({
   name:String,
   companyName:String,
   dateOfBirth:String,
   address:String,
   avatar:String ,
   tokenfacebook:String,
   userName:String,
   pass:String,
   status:Number
   
});
var Todos=mongoose.model("Members",todoSchema);
module.exports=Todos;