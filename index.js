const express = require("express")
const {connnection} = require("./db")
const {userRouter} = require("./routes/userroutes")
const {photoRouter} = require("./routes/photosroutes")
const multer = require("multer")
require("dotenv").config()


const app = express()

app.use(express.json())


app.get("/",(req,res)=>{
    try {
        res.send({"msg":"This is homepage"})
    } catch (error) {
        res.send({"error":error})
    }
})
app.use("/users",userRouter)
app.use("/pictures",photoRouter)

app.listen(process.env.port,async()=>{
    try {
        await connnection
        console.log("connected to DB")
        console.log(`Server is runnig at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})

