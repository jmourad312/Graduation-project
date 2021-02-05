const Post = require("../../models/Blog/post");

// show all posts of all users
showAllPosts = (req, res) => {
  const populateQuery = [{ path: "person", select: "firstName" }];
  Post.find({}, { updatedPosts: 0, comment: 0, __V: 0 }).sort({ _id: -1 }).skip(0).limit(6).populate(populateQuery).exec(
    (error, data) => {
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
    })
}

// show all posts of all users
showDetailsPost = (req, res) => {
  const populateQuery = [{ path: "person", select: "firstName" }, {
    path: "comment", populate: 
    [{path: "person",select: "firstName"},{path: "commentReply" ,populate: {path: "person",select: "firstName"}   ,select: "firstName"}] ,
    select: '-post '
  }];
  Post.findOne({ _id: req.params.id }, { updatedPosts: 0, __V: 0 }).populate(populateQuery).exec(
    (error, data) => {
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
    })
}

showFilterPosts = (req, res) => {
  const criteriaSearch = { $regex: req.body.search, $options: 'i' };
  const queryCond = {}
  
  if (req.body.search) {
    queryCond.title = { $regex: req.body.search, $options: 'i' }
    //queryCond.body = { $regex: req.body.search, $options: 'i' };
  }
  if (req.body.model) {
    queryCond.model = req.body.model;
  }
  if (req.body.brand) {
    queryCond.brand = req.body.brand;
  }

  console.log(queryCond)

  Post.aggregate([
    { $match: queryCond },
    { $project: { updatedPosts: false, comment: false, __V: false } },
    { $sort: { _id: -1 } },
    {
      $lookup: {
        from: "Person",
        localField: "_id",
        foreignField: "_id",
        as: "person"
      }
    }

  ])
    .exec(
      (error, data) => {
        if (error || data.length == 0) {
          return res.status(400).json({
            Data: error,
            Message: "no blogs found",
            Success: false,
          });
        }
        return res.status(200).json({
          Data: data,
          Message: `posts: filter ${data.length}`,
          Success: true,
        });
      })
};

module.exports = {
  showAllPosts,
  showDetailsPost,
  showFilterPosts,
};