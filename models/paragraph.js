const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const paragraph_Schema=new Schema({
    hello_p:{ type:String},
    work_p:{ type:String},
    experiance_p:{ type:String},
    descabout_p:{ type:Number},
    
});

const paragraph=mongoose.model("paragraph",paragraph_Schema);
module.exports=paragraph;