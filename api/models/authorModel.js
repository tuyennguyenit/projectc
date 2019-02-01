var mongoose=require("mongoose");
var Schema=mongoose.Schema;

//create schema and model
// const BookSchema= new Schema({
//     title: String,
//     numberOfPages:Number,
// });

//cách 1: books:[BookSchema]
//cách 2 nhanh

const AuthorSchema = new Schema({
    name: String,
    age: Number,
    //books: [BookSchema]
    books:[{title:String,numberOfPages:Number}]
})



// var authorSchema = Schema({
//     name      : String,
//     email     : String,
//     _posts    : [{ type: Schema.Types.ObjectId, ref: 'Post' }]
//   });
   
//   var postSchema = Schema({
//     _creator  : { type: Schema.Types.ObjectId, ref: 'Author' },
//     title     : String,
//     body      : String
//   });

// var Post  = mongoose.model('Post', postSchema);
// var Author = mongoose.model('Author', authorSchema);



const Author= mongoose.model('author',AuthorSchema);
module.exports=Author;



