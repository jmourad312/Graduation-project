const carItem = require("../../models/CarDetails/sparePartCar");
const Feedback = require('../../models/Feedback/feedback')
const Vendor = require('../../models/Person/Vendor/vendor')
// favourite item
// last seen item
// click item show items details
// click vendor name show profile vendor
// rate item
// write feedback item
//show all item search 


// get part of product
partOfItem = (req, res) => {
  const populateQuery = { path: "person", select: "firstName workshopName" };

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

  const idItem = req.params.id;
  const populateQuery = [
    { path: "person", select: "firstName workshopName location" },
    { path: "feedback" , populate:{ path: "user", select: "firstName" } }
  ];

  carItem
    .findOne(
      { _id: idItem },
      { __v: 0 }
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

  const stars = await Feedback.aggregate([
    { $match: { car : data._id} },
    { $group : {_id : null, avgRate : {  $avg : "$rating" } } }
  ]).then("done")
      //const feedback = await Feedback.find({ _id: { $in: data.feedback } }, { __v: 0, car: 0 }).populate({ path: "user", select: "firstName" })
      return res.json({
        Data: data,stars,
        Message: "Details product",
        Success: true,
      });
    });
};

showFilterItems = (req, res) => {
  // Filter BY => search,priceLessThan,priceMoreThan,carBrand,carModel

  const criteriaSearch = { $regex: req.body.search, $options: "i" };
  const queryCond = {};
 ///////      0
  if (req.body.price) {
    queryCond.$and = [
      { price: { $gte: req.body.price[0] } },
      { price: { $lte: req.body.price[1] } },
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
  const populateQuery = [{ path: "person", select: "firstName workshopName" }];

  carItem
    .find(queryCond, { __v: 0 })
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
      const TotalItem = await carItem.countDocuments(queryCond).then("Done").catch("Error")
      return res.json({
        Data: data,
        TotalItem:TotalItem,
        Message: `posts: filter ${data.length}`,
        Success: true,
      });
    });
};

showVendorProfile = (req, res) => {
  const populateQuery = [
    { path: "person", select: "-password -email -role -codeToResetPassword -subscribe" },
    { path: "vendorItems"}
  ]

  Vendor.findOne({ person: req.params.id }, { __v: 0, banned: 0, workshopSchedule: 0 }).populate(populateQuery).exec((error, data) => {
    if (error || data.length == 0) {
      return res.json({
        "Data": error,
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
