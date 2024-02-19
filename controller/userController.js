const {UserModel} = require("../model/userModel")
const {BlackListModel}= require("../model/blackListModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = (req,res)=>{
    const{username,email,password,city,age,gender} = req.body
    // if(users.some(users=>user.email===email)){
    //     return res.status(400).send({"msg":"user already exists"})
    // }
    try {
        bcrypt.hash(password,8,async(err,hash)=>{
            if(err){
                res.send({"err":err})
            }
            else{
                const user = new UserModel({
                    username,email,password:hash,city,age,gender
                })
                await user.save();
                res.status(200).send({"msg":"User added successfully"})
            }
        })
        
    } catch (error) {
        res.status(500).send({"error":error})
    }
}

//authenticate user
const loginUser = async(req,res)=>{
    const{email,password}= req.body;
    try {
        const user = await UserModel.findOne({email})
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const accessToken = jwt.sign({userId:user._id},"masai",{expiresIn:"7d"})
                res.status(200).send({"msg":"login Successfull",accessToken})
            }
            else{
                res.status(400).send({"msg":"User did not exist please register"})
            }
        })
        
    } catch (error) {
        res.status(500).send({"error":error})
    }
}

//logout user

const logoutUser = async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const blackList = new BlackListModel({blackListToken:token})
        await blackList.save();
        res.status(200).send({"msg":"logout Success"})
        
    } catch (error) {
        res.status(500).send({"error":error})
    }

}



module.exports= {
    registerUser,loginUser,logoutUser
}


