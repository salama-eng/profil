const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const work_Schema=new Schema({
 
    project_title:{ type:String,required:true},
    project_name:{ type:String,required:true},
    img:{type:String}
});

const work=mongoose.model("work",work_Schema);
module.exports=work;