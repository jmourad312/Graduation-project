const carItem = require("../../models/CarDetails/sparePartCar");

// favourite item 
// last seen item 
// click item show items details 
// click vendor name show profile vendor 
// rate item
// write feedback item
//show all item search ------->>>>>

// get part of product 
partOfItem = (req, res) => {
    const populateQuery = [{ path: "person", select: "firstName" }, {
        path: "carBrand", populate:
            { path: "carModel", select: "model" },
        select: 'name'
    }];

    carItem.find({}, {name: 1, price: 1, description: 1, image: 1 }).populate(populateQuery).sort({ _id: -1 }).skip(0).limit(6).exec((err, data) => {
        if (err || data.length == 0) {
            return res.json({
                "Data": err,
                "Message": "No Data found in DB",
                "Success": false
            })
        }

        return res.json({
            "Data": data,
            "Message": `6 protuct `,
            "Success": true
        })
    })

};

// show all posts of all users
showDetailsItem = (req, res) => {
    const populateQuery = [{ path: "person", select: "firstName" }, {
        path: "carBrand", populate:
            { path: "carModel", select: "model" },
        select: 'name'
    }];
    carItem.findOne({ _id: req.params.id }, {name: 1, price: 1, description: 1, image: 1 }).populate(populateQuery).exec(
      (error, data) => {
        if (error || data.length == 0) {
          return res.status(400).json({
            Data: error,
            Message: "no product found",
            Success: false,
          });
        }
        return res.status(200).json({
          Data: data,
          Message: "Details product",
          Success: true,
        });
      })
  }

showFilterProducts = (req, res) => {
    const criteriaSearch = { $regex: req.body.search, $options: 'i' };
    const queryCond = {}

    if (req.body.search) {
        queryCond.name = { $regex: req.body.search, $options: 'i' }
        //queryCond.body = { $regex: req.body.search, $options: 'i' };
    }
    if (req.body.model) {
        queryCond.model = req.body.model;
    }
    if (req.body.brand) {
        queryCond.brand = req.body.brand;
    }

    console.log(queryCond)
    const populateQuery = [{ path: "person", select: "firstName" }];

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

module.exports = { partOfItem, showFilterProducts, showDetailsItem }