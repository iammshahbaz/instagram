const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    blackListToken:{type:String,required:true},
},{
    versionKey:false
})

const BlackListModel = mongoose.model("BlackListToken",blacklistSchema)

module.exports={
    BlackListModel
}