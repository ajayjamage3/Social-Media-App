### Social Media App


#### Features

- allow users to register
- Get list of all registered users
- Get list of all friends of a specific user identified by its ID
- allow the user to send a friend request to another user identified by its ID
- allow users to accept or reject friend requests sent to them by another user identified by its ID
- Get list of all posts
- allow the user to create a new post
- allow users to update the text or image of a specific post identified by its ID
- allow users to delete a specific post identified by its ID
- allow users to like a specific post identified by its ID
- allow users to comment on a specific post identified by its ID
- Get details of a specific post identified by its Id

### Installation 

```
git clone https://github.com/ajayjamage3/Social-Media-App.git
```

#### Intall npm package

```
npm install
```

#### Environment variables

- mongourl
- port

### API endpoints
#### API 
```

```

#### Register User
- method:POST
```
api/register
```
#### Schema:
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}
```

#### Get list of all users
- method:GET
```
api/users
```

#### Get list of all friends of a specific user identified by its ID
- method:GET
```
/api/users/:id/friends
```

#### allow the user to send a friend request to another user identified by its ID
- method:POST
```
/api/users/:id/friends
```
#### Schema
```
{reqId}
```

#### allow users to accept or reject friend requests sent to them by another user identified by its ID
- method:POST
```
/api/users/:id/friends/:friendId
```

#### Get list of all posts
- method:GET
```
/api/posts
```
#### allow the user to create a new post
- method:POST
```
/api/posts
```
#### Schema
```
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}
```

#### allow users to update the text or image of a specific post identified by its ID
- method:PATCH
```
/api/posts/:id
```

#### allow users to delete a specific post identified by its ID
- method:DELETE
```
/api/posts/:id
```

#### allow users to like a specific post identified by its ID
- method:POST
```
/api/posts/:id/like
```
#### Schema
```
{
    likes:id(who liked the post)
}
```

#### allow users to comment on a specific post identified by its ID
- method:POST
```
/api/posts/:id/comments
```
#### Schema
```
{
    "user": (who commenting the post),
    "text": "String",
    "image": "url"
}
```

#### Get details of a specific post identified by its Id
- method:GET
```
/api/posts/:id/like
```