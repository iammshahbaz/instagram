const express = require("express")
const{registerUser,loginUser,logoutUser} = require("../controller/userController")

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/logout",logoutUser)



module.exports={
    userRouter
}