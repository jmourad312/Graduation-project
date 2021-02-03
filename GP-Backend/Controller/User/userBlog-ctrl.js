const person = require("../../models/Person/person");
const user = require("../../models/Person/User/user");

const Post = require("../../models/Blog/post");
const Comment = require("../../models/Blog/reply");

// add post
// delete post
// update post->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// add comment
// vote on comment
// show his posts
// show all posts of all users
//add post to bookmarks

//add post
addNewPost = (req, res) => {
  const body = req.body;
  const IdPerson = req.user._id;
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
  const IdPerson = req.user._id;
  Post.deleteOne({ _id: req.params.id, person: IdPerson }, (err, data) => {
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
  const IdPerson = req.user._id;
  let { ...data } = req.body;
  Post.updateOne(
    { _id: req.params.id, person: IdPerson },
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
  const IdPerson = req.user._id;
  const IdPost = req.params.idpost;

  if (!body) {
    return res.json({
      Data: null,
      Message: "You must Type any comment",
      Success: false,
    });
  }

  const comment = new Comment(body);
  comment.person = IdPerson;
  comment.post = IdPost;
  comment.save()

  const populateQuery = [{ path: "comment", select: "-__v -_id -person" }];

  Post.findByIdAndUpdate(
    { _id: IdPost },
    {
      $push: { comment: comment },
    },
    { new: true }
  )
    .populate(populateQuery)
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


//add comment
addCommentReply = (req, res) => {
  const body = req.body;
  const IdPerson = req.user._id;
  const IdPost = req.params.idpost;
  const IdComment = req.params.idcomment;

  if (!body) {
    return res.json({
      Data: null,
      Message: "You must Type any comment",
      Success: false,
    });
  }

  const comment = new Comment(body);
  comment.person = IdPerson;
  comment.post = IdPost;
  comment.save()
  const populateQuery = [{ path: "comment", select: "-__v -_id -person" }];

  Comment.findByIdAndUpdate(
    { _id: IdComment },
    {
      $push: { commentReply: comment },
    },
    { new: true }
  )
    .populate(populateQuery)
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
showAllPosts = (req, res) => {
  Post.find({}, (error, data) => {
    if (error || !data.length) {
      return res.status(400).json({
        Data: error,
        Message: "no blogs found",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: data,
      Message: "احلى بلوج لاحلى زبون",
      Success: true,
    });
  })
}

showPostsOfUser = (req, res) => {
  const IdPerson = req.user._id;
  Post.find({ person: IdPerson }, (error, data) => {
    if (error || !data.length) {
      return res.status(400).json({
        Data: error,
        Message: "no blogs found",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: data,
      Message: "احلى بلوج لاحلى زبون",
      Success: true,
    });
  })
}

voteToComment = (req, res) => {

  Comment.updateOne({ _id: req.params.id }, { $push: { Voting: req.user._id } }, (error, data) => {
    if (error) {
      return res.status(400).json({
        Data: error,
        Message: "can't vote",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: data.n,
      Message: "احلى فوت",
      Success: true,
    });
  })

}

removeVoteFromComment = (req, res) => {
  Comment.updateOne({ _id: req.params.id }, { $pullAll: { Voting: req.user._id } }, (error, data) => {
    if (error) {
      return res.status(400).json({
        Data: error,
        Message: "can't delete vote",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: data.n,
      Message: " لييييه يا اخي بس ",
      Success: true,
    });
  })
}

numberOfVoting = (req, res) => {
  Comment.findOne({ _id: req.params.id }, { Voting: 1 }, (error, data) => {
    if (error) {
      return res.status(400).json({
        Data: error,
        Message: "can't delete vote",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: data.Voting.length,
      Message: "number of voting",
      Success: true,
    });
  })
}


module.exports = { addNewPost, deletePost, updatePost, addComment, addCommentReply, showAllPosts, showPostsOfUser, voteToComment, removeVoteFromComment, numberOfVoting };
