const Post = require("../../models/Blog/post");
const person = require("../../models/Person/person");
const user = require("../../models/Person/User/user");



// show all posts of all users



//show filter posts
showFilterPosts = (req, res) => {
    const criteriaSearch = { $regex: req.body.search, $options: 'i' };
    const query =  {$or:[{title: criteriaSearch},{body:criteriaSearch}] } 
    const populateQuery = [{ path: "person", select: "firstName" }];
  
    Post.find(query, { updatedPosts: 0, comment: 0, __V: 0 }).sort({ _id: -1 }).populate(populateQuery).exec(
      (error, data) => {
        if (error || data.length==0) {
          return res.status(400).json({
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
      })
  }
  