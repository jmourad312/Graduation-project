const person = require("../../models/Person/person");
const user = require("../../models/Person/User/user");

const Post = require("../../models/Blog/post");
const Comment = require("../../models/Blog/reply");
const Vote = require('../../models/Blog/votingPost')
const BookmarkPostsList = require("../../models/Blog/bookmarkPostsList");

// add post
// delete post
// update post->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// add comment
// vote on comment
// show his posts
// add post to bookmarks
// show posts in bookmarks

//add post
addNewPost = (req, res) => {

  const body = JSON.parse(JSON.stringify(req.body));
  // const images = [];
  // req.files.map((file) => {
  //   images.push("http://localhost:3000/images/" + file.filename);
  //   console.log(images)
  // });
  const Postinput ={}
  //kjiuhuihuihuihiuhukukukuk
  if(req.file.filename){Postinput.image = "http://localhost:3000/images/"+req.file.filename}

  const IdPerson = req.user._id;
  if (!body) {
    return res.json({
      Data: null,
      Message: "Youhhhhh must Type any words",
      Success: false,
    });
  }

  const post = new Post({...body,...Postinput});
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
        Message: "Youoooo must Type any words",
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

  const vote = new Vote();
  vote.save();

  const comment = new Comment(body);
  comment.person = IdPerson;
  comment.post = IdPost;
  comment.vote = vote._id;

  comment.save().then((dataComment) => {
    vote.comment = dataComment._id;
    vote.save();
  }
  ).catch((error) => {
    return res.status(400).json({
      Data: error,
      Message: "*****************",
      Success: false,
    });
  });

  const populateQuery = [
    {
      path: "comment",
      populate: {
        path: "person",
        select: "firstName",
      },
      select: "-post -commentReply",
    },
  ];

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
          Data: data.comment[data.comment.length - 1],
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
  comment.save();

  const populateQuery = [
    {
      path: "commentReply",
      populate: {
        path: "person",
        select: "firstName",
      },
      select: "-post -commentReply",
    },
  ];
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
          Data: data.commentReply[data.commentReply.length - 1],
          Message: "Your comment is uploaded",
          Success: true,
        });
      }
    });
};

// show all posts of all users
showAllPosts = (req, res) => {
  const populateQuery = [{ path: "person", select: "firstName" }];
  Post.find({}, { updatedPosts: 0, comment: 0, __V: 0 })
    .sort({ _id: -1 })
    .skip(0)
    .limit(6)
    .populate(populateQuery)
    .exec((error, data) => {
      if (error || data.length == 0) {
        return res.status(400).json({
          Data: error,
          Message: "no blogs found",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: data,
        Message: "The last 6 posts",
        Success: true,
      });
    });
};

// show all posts of all users
showDetailsPost = (req, res) => {
  const populateQuery = [
    { path: "person", select: "firstName" },
    {
      path: "comment",
      populate: [{ path: "person", select: "firstName"}
      , { path: "vote", select: "numberOfVoting" }
      ],
      select: "-post ",
    },
  ];
  Post.findOne({ _id: req.params.id }, { updatedPosts: 0, __V: 0 })
    .populate(populateQuery)
    .exec((error, data) => {
      if (error || data.length == 0) {
        return res.status(400).json({
          Data: error,
          Message: "no blogs found",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: data,
        Message: "Details Post",
        Success: true,
      });
    });
};

showFilterPosts = (req, res) => {
  const criteriaSearch = { $regex: req.body.search, $options: 'i' };
  const queryCond = {}

  if (req.body.search) {
    queryCond.$or = [{ body: criteriaSearch }, { title: criteriaSearch }]
  }
  if (req.body.model) {
    queryCond.model = req.body.model;
  }
  if (req.body.brand) {
    queryCond.brand = req.body.brand;
  }
  console.log(queryCond)
  const populateQuery = [{ path: "person", select: "firstName" }];

  Post.find(queryCond, { updatedPosts: 0, comment: 0, __V: 0 })
    .sort({ _id: -1 })
    .populate(populateQuery)
    .skip(0)
    .limit(9)
    .exec((error, data) => {
      if (error || data.length == 0) {
        return res.status(200).json({
          Data: error,
          Message: "no blogs found",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: data,
        Message: "posts: filter",
        Success: true,
      });
    });
};

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
  });
};

// remove voting on comment
removeVoteFromComment = async (req, res) => {

  const personVote = await Vote.find({ person: { $in: req.user._id } })

  if (personVote.length == 0) {
    return res.json({
      Data: null,
      Message: "You already don't vote before",
      Success: false,
    });
  }

  Vote.updateOne(
    { comment: req.params.id },
    { $pull: { person: req.user._id }, $inc: { numberOfVoting: -1 } },
    (error, data) => {
      if (error) {
        return res.json({
          Data: error,
          Message: "can't vote",
          Success: false,
        });
      }
      return res.json({
        Data: data.n,
        Message: "Done remove voting",
        Success: true,
      });
    }
  );


};

voteToComment = async (req, res) => {

  const personVote = await Vote.find({ person: { $in: req.user._id } })

  if (personVote.length > 0) {
    return res.status(400).json({
      Data: null,
      Message: "You already vote before",
      Success: false,
    });
  }

  Vote.updateOne(
    { comment: req.params.id },
    { $push: { person: req.user._id }, $inc: { numberOfVoting: 1 } },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          Data: error,
          Message: "can't vote",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: data.n,
        Message: "Done add Voting",
        Success: true,
      });
    }
  );
};

// add posts to bookmark
addBookmarks = (req, res) => {
  const body = req.body;
  const IdPerson = req.user._id;
  const IdPost = req.params.idpost;

  if (!body) {
    return res.json({
      Data: null,
      Message: "You must add any post in bookmarks list",
      Success: false,
    });
  }

  const newBookmark = new BookmarkPostsList(body);
  newBookmark.person = IdPerson;
  newBookmark.post = IdPost;
  newBookmark.save();

  if (!newBookmark) {
    return res.status(400).json({
      Data: err,
      Message: "You must add any post in bookmarks list",
      Success: false,
    });
  }

  Post.findById(body.IdPost, "+newBookmark", (user) => {
    user.bookmarkPosts
      .push(newBookmark)
      .save()
      .then(() => {
        return res.status(200).json({
          Data: newBookmark,
          Message: "Your bookmark list updated successfully",
          Success: true,
        });
      })
      .catch((error) => {
        return res.status(200).json({
          Data: error.message,
          Message: "You must add any post in bookmarks list",
          Success: false,
        });
      });
  });
};

//show bookmarks list
getBookmarksList = async (req, res) => {
  const IdPerson = req.user._id;

  await BookmarkPostsList.find({ person: IdPerson }, (err, Bookmarklist) => {
    if (err) {
      return res.status(400).json({
        Data: err,
        Message: "There is no posts in bookmarklist",
        Success: false,
      });
    }
    if (!Bookmarklist.length) {
      return res.status(400).json({
        Data: null,
        Message: "There is no posts in bookmarklist",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: Bookmarklist,
      Message: "this is your posts in bookmarklist ",
      Success: true,
    });
  }).catch((error) => {
    return res.status(200).json({
      Data: error.message,
      Message: "There is no posts in bookmarklist",
      Success: false,
    });
  });
};

module.exports = {
  addNewPost,
  deletePost,
  updatePost,
  addComment,
  addCommentReply,
  showAllPosts,
  showPostsOfUser,
  showDetailsPost,
  showFilterPosts,
  voteToComment,
  removeVoteFromComment,
  addBookmarks,
  getBookmarksList,
};
