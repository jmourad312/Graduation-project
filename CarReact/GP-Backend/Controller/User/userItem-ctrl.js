const carItem = require("../../models/CarDetails/sparePartCar");
const Feedback = require('../../models/Feedback/feedback')
// favourite item
// last seen item
// click item show items details
// click vendor name show profile vendor
// rate item
// write feedback item
//show all item search 


// get part of product
partOfItem = (req, res) => {
  const populateQuery = { path: "person", select: "firstName" };

  carItem
    .find(
      {},
      { name: 1, price: 1, description: 1, image: 1, carModel: 1, carBrand: 1 }
    )
    .populate(populateQuery)
    .sort({ _id: -1 })
    .skip(0)
    .limit(9)
    .exec((err, data) => {
      if (err || data.length == 0) {
        return res.json({
          Data: err,
          Message: "No Data found in DB",
          Success: false,
        });
      }

      return res.json({
        Data: data,
        Message: `9 protuct `,
        Success: true,
      });
    });
};

// show all posts of all users
showDetailsItem = async (req, res) => {

  const idItem = req.params.id ; 
  const populateQuery = [
    { path: "person", select: "firstName" },
  ];

  carItem
    .findOne(
      { _id: idItem},
      {__v:0}
    )
    .populate(populateQuery)
    .exec(async (error, data) => {
      if (error || data.length == 0) {
        return res.json({
          Data: error,
          Message: "no product found",
          Success: false,
        });
      }

      const feedback = await Feedback.find({_id:{$in:data.feedback}},{__v:0,car:0}).populate({path:"user",select:"firstName"})
      
      return res.json({
        Data: {data,feedback},
        Message: "Details product",
        Success: true,
      });
    });
};

showFilterItems = (req, res) => {
  // Filter BY => search,priceLessThan,priceMoreThan,carBrand,carModel

  const criteriaSearch = { $regex: req.body.search, $options: "i" };
  const queryCond = {};

  if (req.body.priceLessThan && req.body.priceMoreThan) {
    console.log(req.body.priceMoreThan);
    queryCond.$and = [
      { price: { $gte: +req.body.priceLessThan } },
      { price: { $lte: +req.body.priceMoreThan } },
    ];
  }

  if (req.body.search) {
    queryCond.$or = [{ name: criteriaSearch }, { description: criteriaSearch }];
  }

  if (req.body.brand) {
    queryCond.carBrand = req.body.brand;
  }
  if (req.body.model) {
    queryCond.carModel = req.body.model;
  }

  console.log(queryCond);
  const populateQuery = [{ path: "person", select: "firstName" }];

  carItem
    .find(queryCond, { __v: 0 })
    .sort({ _id: -1 })
    .populate(populateQuery)
    .skip(0)
    .limit(9)
    .exec((error, data) => {
      if (error || data.length == 0) {
        return res.json({
          Data: error,
          Message: "no blogs found",
          Success: false,
        });
      }
      return res.json({
        Data: data,
        Message: `posts: filter ${data.length}`,
        Success: true,
      });
    });
};

showVendorProfile = (req, res) => {
  const populateQuery = [
    { path: "person", select: "-password -email -role -codeToResetPassword -subscribe" },
    { path: "vendorFeedBack" }
  ]

  Vendor.findOne({ person: req.params.id }, { __v: 0, banned: 0, workshopSchedule: 0 }).populate(populateQuery).exec((error, data) => {
    if (error || data.length == 0) {
      return res.json({
        "Data": err,
        "Message": "No Data found in DB",
        "Success": false
      })
    }
    return res.json({
      "Data": data,
      "Message": "Done Get Vendor Profile",
      "Success": true
    })
  })


}

module.exports = {
  partOfItem, showFilterItems,
  showDetailsItem, showVendorProfile
}
