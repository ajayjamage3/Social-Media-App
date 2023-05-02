const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {UserModel} = require("./user.model")

const postSchema = mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: UserModel },
        text: String,
        image: String,
        createdAt: Date,
        likes: [{ type: Schema.Types.ObjectId, ref: UserModel }],
        comments: [{
          user:{ type: Schema.Types.ObjectId, ref: UserModel },
          text: String,
          createdAt: Date
        }]
    })

const PostModel = mongoose.model("post",postSchema)

module.exports = {
    PostModel
}

// {
//     "user": ,
//     "text": "String",
//     "image": "url",
// }