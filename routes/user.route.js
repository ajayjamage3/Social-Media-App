const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
require("dotenv").config()
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/user.model")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,dob,bio,posts,friends,friendRequests} = req.body
    bcrypt.hash(password,5,async(err,hash_pass)=>{
        if(err){
            console.log(err)
        }else{
            const user = new UserModel({name,email,password:hash_pass,dob,bio,posts,friends,friendRequests})
            await user.save()
            res.status(201).send({"msg":"User registered succesfully"})
        }
    })
})

userRouter.get("/users",async(req,res)=>{
    const users = await UserModel.find() 
    res.status(200).send({users})
})

userRouter.get("/users/:id/friends",async(req,res)=>{
    const id = req.params.id
    const user = await UserModel.findById({_id:id})
    const list = user.friends
    const details = await UserModel.find({"_id" : { $in : list }} )
    res.status(200).send({"friends":details})
})

userRouter.post("/users/:id/friends",async(req,res)=>{
    const id = req.params.id
    const {reqId} = req.body
    await UserModel.findByIdAndUpdate({_id:id},{$push:{friendRequests:reqId}})
    res.status(201).send({"msg":"Friend request sent succesfully"})
})

userRouter.patch("/users/:id/friends/:friendId",async(req,res)=>{
    const {status}  = req.body
    const id = req.params.id
    const friendId = req.params.friendId
    if(status == "accept"){
        await UserModel.findByIdAndUpdate({_id:id},{$push:{friends:friendId}})
        await UserModel.findByIdAndUpdate({_id:id},{$pull:{friendRequests:friendId}})
        res.status(204).send({"msg":"Friend request accepted"})
    }else{
        res.status(204).send({"msg":"Friend request rejected"})

    }
})



module.exports = {
    userRouter
}
