const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
require("dotenv").config()
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/user.model")
const {PostModel} = require("../models/post.model")
const postRouter = express.Router()


postRouter.get("/posts",async(req,res)=>{
    const posts = await PostModel.find() 
    res.status(200).send({"posts":posts})
})

postRouter.post("/posts",async(req,res)=>{
    const {user,image,createdAt,likes,text,comments} = req.body
    const post = new PostModel({user,image,createdAt:new Date(),likes,text,comments})
    await post.save()
    const newId = await PostModel.find({user})
    await UserModel.findByIdAndUpdate({_id:user},{$push:{posts:newId}})
    res.status(201).send({"msg":"post created succesfully"})
})

postRouter.patch("/posts/:id",async(req,res)=>{
    const id = req.params.id
    const change = req.body
    await PostModel.findByIdAndUpdate({_id:id},change)
    res.status(204).send({"msg":"post updated succesfully"})
})

postRouter.delete("/posts/:id",async(req,res)=>{
    const id = req.params.id
    const change = req.body
    await PostModel.findByIdAndDelete({_id:id})
    res.status(204).send({"msg":"post deleted succesfully"})
})

postRouter.post("/posts/:id/like",async(req,res)=>{
    const id = req.params.id
    const {likes} = req.body
    await PostModel.findByIdAndUpdate({_id:id},{$push:{likes:likes}})
    res.status(201).send({"msg":"Liked post"})
})

postRouter.post("/posts/:id/comment",async(req,res)=>{
    const id = req.params.id
    const {user,text} = req.body
    await PostModel.findByIdAndUpdate({_id:id},{$push:{comments:{user,text,createdAt:new Date()}}})
    res.status(201).send({"msg":"commented to post"})
})

postRouter.get("/posts/:id",async(req,res)=>{
    const id = req.params.id
    const posts = await PostModel.findById({_id:id}) 
    res.status(200).send({"posts":posts})
})


module.exports = {
    postRouter
}


