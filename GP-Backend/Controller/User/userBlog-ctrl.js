const person = require("../../models/Person/person");
const user = require("../../models/Person/User/user");

const Post = require("../../models/Blog/post");
const Comment = require("../../models/Blog/reply");

// add post
// delete post
// update post
// add comment
// vote on comment
// show his posts
// show all posts of all users
//add post to bookmarks

//add post
addNewPost = (req, res) => {
  const body = req.body;
  const IdPerson = body.id;
  if (!body) {
    return res.json({
      Data: null,
      Message: "You must Type any words",
      Success: false,
    });
  }

  const post = new Post(body);
  post.person = IdPerson;

  if (!post) {
    return res.status(400).json({
      Data: err,
      Message: "You must Type any words",
      Success: false,
    });
  }

  post
    .save()
    .then(() => {
      return res.status(200).json({
        Data: post._id,
        Message: "New post is created successfully",
        Success: true,
      });
    })
    .catch((error) => {
      return res.status(200).json({
        Data: error.message,
        Message: "You must Type any words",
        Success: false,
      });
    });
};

//delete post
deletePost = (req, res) => {
  const IdUser = req.user._id;
  Post.deleteOne({ _id: req.params.id, user: IdUser }, (err, data) => {
    if (err) {
      res.json({
        Data: {},
        Message: "Can't delete Post from database",
        Success: false,
      });
    } else {
      if (data.n == 0) {
        res.json({
          Data: {},
          Message: "Data with that id: " + req.params.id + " don't exist",
          Success: false,
        });
      } else {
        res.json({
          Data: {},
          Message: "Your Post is deleted successfully ",
          Success: true,
        });
      }
    }
  });
};

//update post
updatePost = (req, res) => {
  const IdUser = req.user._id;
  let { ...data } = req.body;
  Post.updateOne(
    { _id: req.params.id, user: IdUser },
    data,
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't update this post",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: "Your Post is updated successfully",
        Success: true,
      });
    }
  );
};

//add comment
addComment = (req, res) => {
  const body = req.body;
  const IdPerson = body.id;
 
  if (!body) {
    return res.json({
      Data: null,
      Message: "You must Type any comment",
      Success: false,
    });
  }

  const comment = new Comment(body);
  comment.person = IdPerson;

  Post.findByIdAndUpdate(
    body.postId,
    {
      $push: { Reply: comment },
    },
    { new: true }
  )
    .populate("comment.person", "name")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          Data: err,
          Message: "*****************",
          Success: false,
        });
      } else {
        return res.status(200).json({
          Data: data,
          Message: "Your comment is uploaded",
          Success: true,
        });
      }
    });
};

// show all posts of all users
showAllPosts = (req,res)=>{
  
}

module.exports = { addNewPost, deletePost, updatePost, addComment };
