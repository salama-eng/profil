const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const education_Schema=new Schema({

    s_name:{ type:String,required:true},
    degree:{ type:String,required:true},
    description:{ type:String,required:true},
    date:{type:Date,required:true}
   
});

const education=mongoose.model("education",education_Schema);
module.exports=education;