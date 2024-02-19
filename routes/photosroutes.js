const express = require("express")
const{PhotoModel}= require("../model/picturesModel")
const photoRouter = express.Router();
const {auth} = require("../middleware/auth")
const {upload} = require("../middleware/upload")

photoRouter.post("/",auth,async(req,res)=>{
    try {
        const photo = new PhotoModel(req.body)
        await photo.save();
        res.status(200).send({"msg":"New photo has been added"})
        
    } catch (error) {
        res.status(500).send({"error":error})
    }
})

photoRouter.get("/",auth,async(req,res)=>{
    try {
        const pictures = await PhotoModel.find({userId:req.body.userId})
        res.send({pictures})
    } catch (error) {
        res.status(500).send({"error":error})
    }
})

photoRouter.patch("./:photoId",auth,async(req,res)=>{
    const {photoId} = req.params
    try {
       const picture = await PhotoModel.findOne({_id:photoId}) 
       if(picture.userId===req.body.userId){
        await PhotoModel.findByIdAndUpdate({_id:photoId},req.body)
        res.status(200).send({"msg":`Photo with id:${photoId} has been updated`})
       }
       else{
        res.send({"msg":"you are not authorized"})
       }
    } catch (error) {
        res.status(500).send({"error":error})
    }
})

//delete

photoRouter.delete("./:photoId",auth,async(req,res)=>{
    const {photoId} = req.params
    try {
       const picture = await PhotoModel.findOne({_id:photoId}) 
       if(picture.userId===req.body.userId){
        await PhotoModel.findByIdAndDelete({_id:photoId},req.body)
        res.status(200).send({"msg":`Photo with id:${photoId} has been deleted`})
       }
       else{
        res.send({"msg":"you are not authorized"})
       }
    } catch (error) {
        res.status(500).send({"error":error})
    }
})


module.exports={
    photoRouter
}