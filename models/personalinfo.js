const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const personal_info_Schema=new Schema({
  
    name:{ type:String,required:true},
    phone:{ type:Number,required:true},
    website:{type:String,require:true},
    location:{type:String,require:true},
    image:{type:String}
});

const personal_info=mongoose.model("personal_info",personal_info_Schema);
module.exports=personal_info;