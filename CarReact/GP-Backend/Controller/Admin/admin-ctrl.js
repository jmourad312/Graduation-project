const Brand = require("../../models/CarDetails/carBrand");
const Model = require("../../models/CarDetails/carModel");
const carItem = require("../../models/CarDetails/sparePartCar");
const Collection = require("../../models/CarDetails/ItemCollection");

const Post = require("../../models/Blog/post");
const Comment = require("../../models/Blog/reply");

const User = require("../../models/Person/User/user");
const Vendor = require("../../models/Person/Vendor/vendor");

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

addModel = (req, res) => {
  const model = new Model(req.body);
  model.save();
  Brand.updateOne({ _id: req.params.id }, { $push: { carModel: model._id } })

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

addCollection = (req, res) => {
  const collection = new Collection(req.body);
  collection.save();
  carItem
    .updateOne(
      { _id: req.params.id },
      { $push: { itemCollection: carItem._id } }
    )
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

//---------------------------------------------user -------------------------------------------------------------------

//show all users
showAllUsers = (req, res) => {
  const populateQuery = [{ path: "person", select: "firstName , email" }];

  User.find({}).populate(populateQuery).exec((err, users) => {

    if (err) {
      return res.status(400).json({
        Data: null,
        Message: "You can't count the number of users",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: users,
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
  User.updateOne(
    { person: IdPerson },
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

// remove ban
removeUserBan = (req, res) => {
  const IdPerson = req.body.id;
  User.updateOne(
    { person: IdPerson },
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
  const populateQuery = [{ path: "person", select: "firstName , email" }];


  Vendor.find({}).populate(populateQuery).exec((err, vendors) => {



    if (err) {
      return res.status(400).json({
        Data: null,
        Message: "You can't count the number of users",
        Success: false,
      });
    }
    return res.status(200).json({
      Data: vendors,
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
  Vendor.updateOne(
    { person: IdPerson },
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

  Vendor.updateOne(
    { person: IdPerson },
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
calculateProducts = (req,res) =>{
  const IdPerson = req.vendor._id;
  carItem.aggregate(
    [
      {
        $group:
          {
            _id:IdPerson,
            totalAmount: { $sum: carItem },
  
          }
      }
    ]
 )

}

// vendor and number of product 
vendorAndProducts = (req, res) => {

  carItem.aggregate([
    {
      $lookup: {
        from: 'person',
        localField: 'person',
        foreignField: "_id",
        as: 'Person'
      }
    }
    , {
      $group:
      {
        _id: "$person",
        count: { $sum: 1 }
      }
    }], function (err, result) {
      if (err) {
        return res.status(400).json({
          Data: err,
          Message: `can't get data`,
          Success: true,
        });
      }
      else {
        return res.status(200).json({
          Data: result,
          Message: `number of product per vendor`,
          Success: true,
        });
      }
    })

}

countAll = (req, res) => {

  Promise.all([
    User.count().exec(),
    Vendor.count().exec(),
     carItem.count().exec(),
      Post.count().exec(),])

    .then((counts,error)=> {
      if(error){
        return res.json({
          Data: error,
          Message: `Can't count`,
          Success: false,
        });
      }
      return res.json({
        Data: {
          "user":counts[0],
          "vendor":counts[1],
          "product":counts[2],
          "blogs":counts[3]
        },
        Message: `Done`,
        Success: true,
      });
    });
}


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
  countAll
};
