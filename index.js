const express = require("express")
const app = express()
app.use(express.json())
const cors =require("cors")
app.use(cors())
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")
const{ connection} = require("./config/db")
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/",userRouter)
app.use("/",postRouter)

const port = process.env.port
app.listen(port,async()=>{
    try {
        await connection
        console.log("conected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is rinning at ${port}`)
})