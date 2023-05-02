const mongoose = require("mongoose")
// const {PostModel} = require("./post.model")
const Schema = mongoose.Schema
const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        dob: Date,
        bio: String,
        posts: [{ type: Schema.Types.ObjectId}],
        friends: [{ type: Schema.Types.ObjectId}],
        friendRequests: [{ type: Schema.Types.ObjectId}]
      }
)

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}

// {
//     "name": "Ajay",
//     "email": "ajay@gmail.com",
//     "password": "ajay",
//     "dob": "2000-08-18",
//     "bio": "hiii"
//   }