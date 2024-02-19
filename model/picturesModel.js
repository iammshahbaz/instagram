const mongoose = require("mongoose")

const photosSchema = mongoose.Schema({
    quote:{type:String,required:true},
    photo:{type:String},
    device:{type:String}, 
    commentCount:{type:Number,required:true},
    userId:{type:Number,required:true},
   
},{
    versionKey:false
})

const PhotoModel = mongoose.model("photo",photosSchema)

module.exports={
    PhotoModel
}