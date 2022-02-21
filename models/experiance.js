const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const experiance_Schema=new Schema({
    paragraph:{ type:String,required:true},
    company:{ type:String,required:true},
    postion:{ type:String,required:true},
    description:{ type:Number,required:true},
    date_start:{type:Date,required:true},
    date_end:{type:Date,required:true}
});

const experiance=mongoose.model("experiance",experiance_Schema);
module.exports=experiance;