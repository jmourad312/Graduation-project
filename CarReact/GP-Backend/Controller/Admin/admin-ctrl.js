const Brand = require("../../models/CarDetails/carBrand");
const Model = require("../../models/CarDetails/carModel");
const carItem = require("../../models/CarDetails/sparePartCar");
const Collection = require("../../models/CarDetails/ItemCollection");

const Post = require("../../models/Blog/post");
const Comment = require("../../models/Blog/reply");
const feedback = require("../../models/Feedback/feedback");
const User = require("../../models/Person/User/user");
const Vendor = require("../../models/Person/Vendor/vendor");
const Person = require("../../models/Person/person");

//addban user
//removebaanuser
//addbanvendor
//removebanvendor
//cal number of user
//cal number of vendor and his products
// add collection

addBrand = (req, res) => {
  const brand = new Brand(req.body);
  brand
    .save()

    .then((data) => {
      return res.status(200).json({
        Data: data,
        Message: "done add brand",
        Success: true,
      });
    })
    .catch((error) => {
      return res.status(200).json({
        Data: error.message,
        Message: "can't add brand",
        Success: false,
      });
    });
};

getBrand = (req, res) => {
  Brand.find({}, { name: 1, _id: 1 }, (error, data) => {
    if (error || data.length == 0) {
      return res.status(400).json({
        Data: null,
        Message: "Brand not found",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: data,
      Message: "احلى براند لاحلى زبون",
      Success: true,
    });
  });
};

updateBrand = (req, res) => {
  const body = req.body;

  Brand.updateOne(
    { _id: req.params.id },
    body,
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.json({
          Data: null,
          Message: "You can't update an item ",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: "You can update an item ",
        Success: true,
      });
    }
  );
};

deleteBrand = (req, res) => {
  Brand.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.json({
        Data: err,
        Message: "You can't delete user",
        Success: false,
      });
    }
    return res.json({
      Data: data.n,
      Message: "Done deletes",
      Success: true,
    });
  });
};

//Model
addModel = (req, res) => {
  const model = new Model(req.body);
  model.save();
  Brand.updateOne({ name: req.params.id }, { $push: { carModel: model._id } })

    .then((data) => {
      return res.status(200).json({
        Data: data.n,
        Message: "done add brand",
        Success: true,
      });
    })
    .catch((error) => {
      return res.status(200).json({
        Data: error.message,
        Message: "can't add brand",
        Success: false,
      });
    });
};

getModel = (req, res) => {
  Brand.find({ name: req.params.name }, { carModel: 1 })
    .populate({ path: "carModel", select: "model" })
    .exec((error, data) => {
      if (error || data.length == 0) {
        return res.status(400).json({
          Data: null,
          Message: "Model not found",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: data,
        Message: "احلى موديل لاحلى زبون",
        Success: true,
      });
    });
};

deleteModel = (req, res) => {
  Brand.updateOne(
    { name: req.params.id },
    { $pull: { carModel: req.params.id } }
  )

    .then(async (data) => {
      await Model.deleteOne({ _id: req.params.id }).then("Done").catch("Error");
      return res.status(200).json({
        Data: data.n,
        Message: "done delete model",
        Success: true,
      });
    })
    .catch((error) => {
      return res.json({
        Data: error.message,
        Message: "can't delete model",
        Success: false,
      });
    });
};

updateModel = (req, res) => {
  const body = req.body;

  Model.updateOne(
    { _id: req.params.id },
    body,
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.json({
          Data: err,
          Message: "You can't update an Model",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: "You can update an Model ",
        Success: true,
      });
    }
  );
};

//Collection
addCollection = (req, res) => {
  const collection = new Collection(req.body);
  collection
    .save()
    .then((data) => {
      return res.json({
        Data: data,
        Message: "done add collection",
        Success: true,
      });
    })
    .catch((error) => {
      return res.status(200).json({
        Data: error.message,
        Message: "can't add collection",
        Success: false,
      });
    });
};

updateCollection = (req, res) => {
  const body = req.body;

  Collection.updateOne(
    { _id: req.params.id },
    body,
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't update an Collection",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: "You can update an Collection ",
        Success: true,
      });
    }
  );
};

deleteCollection = (req, res) => {
  Collection.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.json({
        Data: err,
        Message: "You can't delete Collection",
        Success: false,
      });
    }
    return res.json({
      Data: data.n,
      Message: "Done deletes",
      Success: true,
    });
  });
};

//---------------------------------------------user -------------------------------------------------------------------

//show all users
showAllUsers = (req, res) => {

  const criteriaSearch = { $regex: req.body.search, $options: "i" };
  let queryCond = {};
  if (req.body.search) {
    queryCond.$or = [{ email: criteriaSearch }, { firstName: criteriaSearch }];
  }
  queryCond.role = "user";

  const populateQuery = [
    { path: "userId", populate:{path:"postsUser", populate: [{ path: "reportPosts" }]}},
  ];

  Person.find(queryCond)
  .populate(populateQuery
  )
    .skip(+req.params.skip)
    .limit(5)
    .exec(async (err, users) => {
      if (err) {
        return res.json({
          Data: null,
          Message: "You can't count the number of users",
          Success: false,
        });
      }
      let number = 0;
      number = await Person.find(queryCond)
      return res.json({
        Data: users,
        count:number,
        Message: "this is the full number of users",
        Success: true,
      });
    });
};


showAllUsersPosts = (req, res) => {

  const populateQuery = [
    { path: "person",select: "firstName middleName email"},
    {
      path: "postsUser",
      populate: [{ path: "reportPosts" }],
    },
  ];

  User.find({})
  .populate(populateQuery)
    .skip(+req.params.skip)
    .limit(5)
    .exec(async (err, users) => {
      if (err) {
        return res.json({
          Data: null,
          Message: "You can't count the number of users",
          Success: false,
        });
      }
      let number = 0;
      number = await User.find()
      return res.json({
        Data: users,
        count:number,
        Message: "this is the full number of users",
        Success: true,
      });
    });
};

//cal number of user
usersNumber = (req, res) => {
  User.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(400).json({
        Data: null,
        Message: "You can't count the number of users",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: count,
      Message: "this is the full number of users",
      Success: true,
    });
  });
};

//add ban
addUserBan = (req, res) => {
  const IdPerson = req.body.id;
  Person.updateOne(
    { _id: IdPerson },
    { $set: { banned: true } },

    (err, result) => {
      if (err) {
        return res.json({
          Data: null,
          Message: "You can't ban this user",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: "this user is pnanned successfully",
        Success: true,
      });
    }
  );
};

deleteUser = (req, res) => {
  Person.deleteOne({ _id: req.params.id }, async (err, data) => {
    if (err) {
      return res.json({
        Data: err,
        Message: "You can't delete user",
        Success: false,
      });
    }
   await User.deleteOne({ person: req.params.id }).then("Done");
    await Post.deleteMany({ person: req.params.id }).then('Done');


    return res.json({
      Data: data.n,
      Message: "Done deletes",
      Success: true,
    });
  });
};

// remove ban
removeUserBan = (req, res) => {
  const IdPerson = req.body.id;
  Person.updateOne(
    { _id: IdPerson },
    { $set: { banned: false } },

    (err, result) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't ban this user",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: `${IdPerson.firstName} is pnanned successfully`,
        Success: true,
      });
    }
  );
};
//---------------------------------------------vendor -------------------------------------------------------------------

// show all vendors
showAllVendors = (req, res) => {

  const populateQuery = [
    { path: "vendorId"},
  ];

  const criteriaSearch = { $regex: req.body.search, $options: "i" };
  let queryCond = {};
  if (req.body.search) {
    queryCond.$or = [{ email: criteriaSearch }, { firstName: criteriaSearch }];
  }
  queryCond.role = "vendor";

  Person.find(queryCond)
  .populate(populateQuery)
    .skip(+req.params.skip)
    .limit(5)
    .exec(async(err, vendors) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't count the number of users",
          Success: false,
        });
      }
      let number = 0;
      number = await Person.find(queryCond)

      return res.status(200).json({
        Data: vendors,
        count:number,
        Message: "this is the full number of users",
        Success: true,
      });
    });
};

showAllVendorsProducts = (req, res) => {

  const populateQuery = [
    { path: "person", select: "firstName workshopName middleName email" },
  ];

  Vendor.find({})
  .populate(populateQuery)
    .skip(+req.params.skip)
    .limit(5)
    .exec(async(err, vendors) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't count the number of users",
          Success: false,
        });
      }
      let number = 0;
      number = await Vendor.find()

      return res.status(200).json({
        Data: vendors,
        count:number,
        Message: "this is the full number of users",
        Success: true,
      });
    });
};

//cal number of vendors
vendorsNumber = (req, res) => {
  Vendor.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(400).json({
        Data: null,
        Message: "You can't count the number of users",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: count,
      Message: "this is the full number of users",
      Success: true,
    });
  });
};

//number of vendors product

numberOfItem = (req, res) => {
  carItem.countDocuments({}, function (err, count) {
    if (err) {
      res.json({
        Data: [],
        Message: "Can't get number of product from database,  " + err,
        Success: false,
      });
    } else {
      if (count.length == 0) {
        res.json({
          Data: {},
          Message: "No Data found in DB",
          Success: false,
        });
      } else {
        res.json({
          Data: count,
          Message: "Number of all Product:" + count,
          Success: true,
        });
      }
    }
  });
};

numberOfBlogs = (req, res) => {
  Post.countDocuments({}, function (err, count) {
    if (err) {
      res.json({
        Data: [],
        Message: "Can't get number of Post from database,  " + err,
        Success: false,
      });
    } else {
      if (count.length == 0) {
        res.json({
          Data: {},
          Message: "No Data found in DB",
          Success: false,
        });
      } else {
        res.json({
          Data: count,
          Message: "Number of all Post:" + count,
          Success: true,
        });
      }
    }
  });
};

// addBan
addVendorBan = (req, res) => {
  const IdPerson = req.body.id;
  Person.updateOne(
    { _id: IdPerson },
    { $set: { banned: true } },

    (err, result) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't ban this user",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: `${IdPerson.firstName} is pnanned successfully`,
        Success: true,
      });
    }
  );
};

// remove ban
removeVendorBan = (req, res) => {
  const IdPerson = req.body.id;

  Person.updateOne(
    { _id: IdPerson },
    { $set: { banned: false } },

    (err, result) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't ban this user",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: result,
        Message: `${IdPerson.firstName} is pnanned successfully`,
        Success: true,
      });
    }
  );
};

//vendors with its product
calculateProducts = (req, res) => {
  const IdPerson = req.vendor._id;
  carItem.aggregate([
    {
      $group: {
        _id: IdPerson,
        totalAmount: { $sum: carItem },
      },
    },
  ]);
};

// vendor and number of product
vendorAndProducts = (req, res) => {
  carItem.aggregate(
    [
      {
        $lookup: {
          from: "person",
          localField: "person",
          foreignField: "_id",
          as: "Person",
        },
      },
      {
        $group: {
          _id: "$person",
          count: { $sum: 1 },
        },
      },
    ],
    function (err, result) {
      if (err) {
        return res.status(400).json({
          Data: err,
          Message: `can't get data`,
          Success: true,
        });
      } else {
        return res.status(200).json({
          Data: result,
          Message: `number of product per vendor`,
          Success: true,
        });
      }
    }
  );
};

countAll = (req, res) => {
  Promise.all([
    User.count().exec(),
    Vendor.count().exec(),
    carItem.count().exec(),
    Post.count().exec(),
  ]).then((counts, error) => {
    if (error) {
      return res.json({
        Data: error,
        Message: `Can't count`,
        Success: false,
      });
    }
    return res.json({
      Data: {
        user: counts[0],
        vendor: counts[1],
        product: counts[2],
        blogs: counts[3],
      },
      Message: `Done`,
      Success: true,
    });
  });
};

deleteVendor = (req, res) => {
  Person.deleteOne({ _id: req.params.id }, async (err, data) => {
    if (err) {
      return res.json({
        Data: err,
        Message: "You can't delete user",
        Success: false,
      });
    }

    await Vendor.deleteOne({ person: req.params.id }).then("Done");
    await carItem.deleteMany({ person: req.params.id });

    return res.json({
      Data: data.n,
      Message: "Done deletes",
      Success: true,
    });
  });
};

getItemsVendor = async (req, res) => {
  const IdVendor = req.params.id;

  carItem.find({ person: IdVendor }, (error, items) => {
    if (error || items.length == 0) {
      return res.json({
        Data: error,
        Message: "Item not found",
        Success: false,
      });
    }
    return res.json({
      Data: items,
      Message: "number of items:" + items.length,
      Success: true,
    });
  });
};

getBlogsUser = (req, res) => {
  const IdPerson = req.params.id;

  const populateQuery = [{ path: "person" }];

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
        Message: "posts for:",
        Success: true,
      });
    });
};

getCollection = (req, res) => {
  Collection.find({}, { type: 1, _id: 1 }, (error, data) => {
    if (error || data.length == 0) {
      return res.json({
        Data: error,
        Message: "Brand not found",
        Success: false,
      });
    }
    return res.json({
      Data: data,
      Message: "احلى براند لاحلى زبون",
      Success: true,
    });
  });
};

module.exports = {
  addModel,
  addBrand,
  getBrand,
  getModel,
  addCollection,
  addUserBan,
  removeUserBan,
  showAllUsers,
  usersNumber,
  addVendorBan,
  removeVendorBan,
  showAllVendors,
  vendorsNumber,
  numberOfItem,
  vendorAndProducts,
  countAll,
  deleteVendor,
  deleteUser,
  getItemsVendor,
  getBlogsUser,
  getCollection,
  updateBrand,
  deleteBrand,
  updateModel,
  deleteModel,
  updateCollection,
  deleteCollection,
  showAllUsersPosts,
  showAllVendorsProducts
};
