const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const experiance_Schema=new Schema({
    
    company:{ type:String,required:true},
    postion:{ type:String,required:true},
    description:{ type:String,required:true},
    date_start:{type:Date,required:true},
    date_end:{type:Date,required:true}
});

const experiance=mongoose.model("experiance",experiance_Schema);
module.exports=experiance;