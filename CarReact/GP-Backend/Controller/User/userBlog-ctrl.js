const Person = require("../../models/Person/person");
const user = require("../../models/Person/User/user");

const Post = require("../../models/Blog/post");
const Comment = require("../../models/Blog/reply");
const Vote = require("../../models/Blog/votingPost");
const Report = require("../../models/Report/report");

// add post
// delete post
// update post
// add comment
// vote on comment
// show his posts
// add post to bookmarks
// show posts in bookmarks

//add post
addNewPost = (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));

  const images = [];
  if (req.files) {
    req.files.map((file) => {
      images.push("http://localhost:3000/images/" + file.filename);
      // console.log(images);
    });
  }

  console.log(images);
  const IdPerson = req.user._id;
  if (!body) {
    return res.json({
      Data: null,
      Message: "You must Type any words",
      Success: false,
    });
  }

  const post = new Post({ ...body, images });
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
    .then((data) => {
      user
        .updateOne({ person: req.user._id }, { $push: { postsUser: data._id } })
        .then(console.log("Done"))
        .catch(console.log("error"));
      return res.json({
        Data: post._id,
        Message: "New post is created successfully",
        Success: true,
      });
    })
    .catch((error) => {
      console.log(req.body);
      return res.json({
        Data: error.message,
        Message: "You must Type any words",
        Success: false,
      });
    });
};

//delete post
deletePost = (req, res) => {
  let IdPerson = req.user._id;

  if (req.params.idperson) {
    IdPerson = req.params.idperson;
  }

  Post.deleteOne(
    { _id: req.params.id, person: IdPerson },
    async (err, data) => {
      if (err) {
        return res.json({
          Data: {},
          Message: "Can't delete Post from database",
          Success: false,
        });
      }
      if (data.n == 0) {
        return res.json({
          Data: {},
          Message: "Data with that id: " + req.params.id + " don't exist",
          Success: false,
        });
      }

      await user
        .updateOne(
          { person: IdPerson },
          {
            $pull: { postsUser: req.params.id },
          }
        )
        .then("Done")
        .catch("error");

      return res.json({
        Data: {},
        Message: "Your Post is deleted successfully ",
        Success: true,
      });
    }
  );
};

//update post
updatePost = (req, res) => {
  let IdPerson = req.user._id;

  if (req.params.idperson) {
    IdPerson = req.params.idperson;
  }

  const body = JSON.parse(JSON.stringify(req.body));

  const images = [];
  if (req.files) {
    req.files.map((file) => {
      images.push("http://localhost:3000/images/" + file.filename);
      // console.log(images);
    });
    body.images = images;
  }

  Object.keys(body).forEach((k) => body[k].length == 0 && delete body[k]);

  if (!body) {
    return res.json({
      Data: null,
      Message: "You must Type any words",
      Success: false,
    });
  }

  Post.updateOne(
    { _id: req.params.id, person: IdPerson },
    { ...body },
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

  comment
    .save()
    .then((dataComment) => {
      vote.comment = dataComment._id;
      vote.save();
    })
    .catch((error) => {
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

//delete comment
deleteComment = (req, res) => {
  let IdPerson = req.user._id;

  Comment.deleteOne(
    { _id: req.params.id, person: IdPerson },
    async (err, data) => {
      if (err) {
        return res.json({
          Data: {},
          Message: "Can't delete comment from database",
          Success: false,
        });
      }
      if (data.n == 0) {
        return res.json({
          Data: {},
          Message: "Data with that id: " + req.params.id + " don't exist",
          Success: false,
        });
      }

      await Post.updateOne(
        { _id: data.post },
        {
          $pull: { comment: data._id },
        }
      )
        .then("Done")
        .catch("error");

      return res.json({
        Data: {},
        Message: "Your comment is deleted successfully ",
        Success: true,
      });
    }
  );
};

//update Comment
updateComment = (req, res) => {
  let IdPerson = req.user._id;

  Comment.updateOne(
    { _id: req.params.id, person: IdPerson },
    { content: req.body.content },
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't update this comment",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: "Your Comment is updated successfully",
        Success: true,
      });
    }
  );
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
      populate: [
        { path: "person", select: "firstName" },
        {
          path: "vote",
          select: "resultVoting",
          options: { sort: { resultVoting: -1 } },
        },
      ],
      select: "-post",
    },
  ];

  Post.findOne({ _id: req.params.id }, { updatedPosts: 0, __V: 0 })
    .populate(populateQuery)
    .exec((error, data) => {
      if (error || !data) {
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
  const criteriaSearch = { $regex: req.body.search, $options: "i" };
  const queryCond = {};

  if (req.body.search) {
    queryCond.$or = [{ body: criteriaSearch }, { title: criteriaSearch }];
  }
  if (req.body.model) {
    queryCond.model = req.body.model;
  }
  if (req.body.brand) {
    queryCond.brand = req.body.brand;
  }
  console.log(queryCond);
  const populateQuery = [{ path: "person", select: "firstName" }];
  //comment
  Post.find(queryCond, { updatedPosts: 0, comment: 0, __V: 0 })
    .sort({ _id: -1 })
    .populate(populateQuery)
    .skip(+req.params.skip)
    .limit(6)
    .exec(async (error, data) => {
      if (error || data.length == 0) {
        return res.json({
          Data: error,
          Message: "no blogs found",
          Success: false,
        });
      }
      const TotalItem = await Post.countDocuments(queryCond)
        .then("Done")
        .catch("Error");
      return res.json({
        Data: data,
        TotalItem: TotalItem,
        Message: "posts: filter",
        Success: true,
      });
    });
};

showPostsOfUser = (req, res) => {
  var IdPerson = req.user._id;

  if (req.params.id) {
    IdPerson = req.params.id;
  }

  const populateQuery = [
    { path: "person", select: "firstName" },
    { path: "reportPosts" },
  ];

  Post.find({ person: IdPerson })
    .sort({ _id: -1 })
    .populate(populateQuery)
    .exec((error, data) => {
      if (error || !data.length) {
        return res.json({
          Data: error,
          Message: "no blogs found",
          Success: false,
        });
      }
      return res.json({
        Data: data,
        Message: "posts",
        Success: true,
      });
    });
};

// remove voting on comment
downVoteToComment = async (req, res) => {
  const personDownVote = await Vote.find({
    personDownVoting: { $in: req.user._id },
    comment: req.params.id,
  });
  console.log(personDownVote);

  if (personDownVote.length > 0) {
    return res.json({
      Data: null,
      Message: "You already vote before",
      Success: false,
    });
  }

  const personVoteUp = await Vote.find({
    personUpVoting: { $in: req.user._id },
    comment: req.params.id,
  });
  console.log(personVoteUp);
  if (personVoteUp.length > 0) {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $pull: { personUpVoting: req.user._id }, $inc: { resultVoting: -1 } },
      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.json({
          Data: data.resultVoting,
          Message: "Done remove voting",
          Success: true,
        });
      }
    );
  } else {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $push: { personDownVoting: req.user._id }, $inc: { resultVoting: -1 } },
      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.status(200).json({
          Data: data.resultVoting,
          Message: "Done add Voting",
          Success: true,
        });
      }
    );
  }
};

upVoteToComment = async (req, res) => {
  const personVoteUp = await Vote.find({
    personUpVoting: { $in: req.user._id },
    comment: req.params.id,
  });
  console.log(personVoteUp);

  if (personVoteUp.length > 0) {
    return res.json({
      Data: null,
      Message: "You already vote before",
      Success: false,
    });
  }

  const personVoteDown = await Vote.find({
    personDownVoting: { $in: req.user._id },
    comment: req.params.id,
  });

  if (personVoteDown.length > 0) {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $pull: { personDownVoting: req.user._id }, $inc: { resultVoting: 1 } },

      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.json({
          Data: data.resultVoting,
          Message: "Done remove voting",
          Success: true,
        });
      }
    );
  } else {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $push: { personUpVoting: req.user._id }, $inc: { resultVoting: 1 } },
      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.status(200).json({
          Data: data.resultVoting,
          Message: "Done add Voting",
          Success: true,
        });
      }
    );
  }
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

sendReport = (req, res) => {
  // {
  //   idBlog: id
  //   message:String
  // }
  const body = req.body;

  const IdPerson = req.user._id;

  if (!(body.message && body.idBlog)) {
    return res.json({
      Data: null,
      Message: "You must Type any words",
      Success: false,
    });
  }

  const report = new Report(body);
  report.user = IdPerson;

  report
    .save()
    .then((dataReport) => {
      Post.updateOne(
        { _id: dataReport.idBlog },
        { $push: { reportPosts: dataReport._id } }
      )
        .then((done) => {
          return res.json({
            Data: null,
            Message: "Done",
            Success: true,
          });
        })
        .catch((error) => {
          return res.json({
            Data: error,
            Message: "Try again",
            Success: false,
          });
        });
    })
    .catch((error) => {
      return res.json({
        Data: error,
        Message: "Try again",
        Success: false,
      });
    });
};

module.exports = {
  addNewPost,
  deletePost,
  updatePost,
  addComment,
  deleteComment,
  updateComment,
  addCommentReply,
  showAllPosts,
  showPostsOfUser,
  showDetailsPost,
  showFilterPosts,
  downVoteToComment,
  upVoteToComment,
  addBookmarks,
  getBookmarksList,
  sendReport,
};
