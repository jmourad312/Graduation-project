const carItem = require("../../models/CarDetails/sparePartCar");
const vendor = require('../../models/Person/Vendor/vendor')

//create new Item
addItem = (req, res) => {

  console.log(req.body);
  console.log(req.file);

  const body = JSON.parse(JSON.stringify(req.body));
  const Postinput ={}
  if(req.file){Postinput.image = "http://localhost:3000/images/"+req.file.filename}

  const IdVendor = req.user._id;
  console.log("adddittem")
  if (!body) {
    return res.json({
      Data: null,
      Message: "You must provide an item ",
      Success: false,
    });
  }

  const car = new carItem({...body,...Postinput});
  car.person = IdVendor;

  if (!car) {
    return res.json({
      Data: err, //null insteat
      Message: "You must provide an item ",
      Success: false,
    });
  }

  car
    .save()
    .then((data) => {

      vendor.updateOne({person:req.user._id},{
        $push:{vendorItems:data._id}
      }).then("Done").catch("error")
      
      return res.status(200).json({
        Data: car._id,
        Message: "New car item is created",
        Success: true,
      });
    })
    .catch((error) => {
      return res.status(200).json({
        Data: error.message,
        Message: "You must provide an item ",
        Success: false,
      });
    });
};

//get all items
getItems = async (req, res) => {
  const IdVendor = req.user._id;

  const criteriaSearch = { $regex: req.body.search, $options: "i" };
  const queryCond = {};
 ///////      0
  if (req.body.priceMoreThan) {
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

   carItem
    .find({ person: IdVendor,...queryCond }).sort({ _id: -1 }).skip(+req.params.skip)
    .limit(3).exec( async (error, items) => {
      if (error || items.length == 0) {
        return res.json({
          Data: error,
          Message: "Item not found",
          Success: false,
        });
      }
      console.log(items)
      const TotalItem = await carItem.countDocuments({ person: IdVendor,...queryCond }).then("Done").catch("Error")
      return res.json({
        Data: items,
        TotalItem:TotalItem,
        Message: "number of items:"+items.length,
        Success: true,
      });
    })

};

//get One Item
getOneItem = async (req, res) => {
  const IdVendor = req.user._id;

  await carItem
    .findOne({ _id: req.params.id, person: IdVendor }, (err, items) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "item not found",
          Success: false,
        });
      }
      if (!items) {
        console.log(items);
        return res.status(400).json({
          Data: null,
          Message: "Item not found ",
          Success: false,
        });
      }
      return res.status(200).json({
        Data: items,
        Message: "احلى ايتم لاحلى زبون",
        Success: true,
      });
    })
    .catch((error) => {
      return res.status(200).json({
        Data: error.message,
        Message: "You must provide an item ",
        Success: false,
      });
    });
};

updateItem = (req, res) => {

  let IdVendor = req.user._id;

  if(req.params.idperson){
    IdVendor = req.params.idperson;
 }

  const body = JSON.parse(JSON.stringify(req.body));

  const Postinput ={}

  if(req.file){Postinput.image = "http://localhost:3000/images/"+req.file.filename}

  carItem.updateOne({ _id: req.params.id, person: IdVendor },
    {...body,...Postinput}, { upsert: true, new: true }, (err, result) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't update an item ",
          Success: false,
        });
      } return res.status(200).json({
        Data: result,
        Message: "You can update an item ",
        Success: true,
      });
    });
};

deleteItem = (req, res) => {
  let IdVendor = req.user._id;

  if(req.params.idperson){
    IdVendor = req.params.idperson;
 }

 console.log(req.params)

  carItem.deleteOne({ _id: req.params.id, person: IdVendor }, async (err, data) => {
    if (err) {
     return res.json({
        "Data": err,
        "Message": "Can't delete item from database",
        "Success": false
      })
    }
       if (data.n == 0) {
        return res.json({
          "Data": {},
          "Message": "Data with that id: " + req.params.id + " don't exist",
          "Success": false
        })
      }

     await vendor.updateOne({person:IdVendor},{
        $pull:{vendorItems:req.params.id}
      }).then("Done").catch("error")

       return res.json({
          "Data": {},
          "Message": "Done delete",
          "Success": true
        })
  })
}

//get number of product
numberOfItem = (req, res) => {
  carItem.estimatedDocumentCount({}, function (err, count) {
    if (err) {
      res.json({
        "Data": [],
        "Message": "Can't get number of product from database,  " + err,
        "Success": false
      })
    }
    else {
      if (count.length == 0) {
        res.json({
          "Data": {},
          "Message": "No Data found in DB",
          "Success": false
        })
      }
      else {
        res.json({
          "Data": count,
          "Message": "Number of all Product:" + count,
          "Success": true
        })
      }
    }
  });
}

// get part of product 
partOfItem = (req, res) => {
  const IdVendor = req.user._id;
  carItem.find({ person: IdVendor }, { __v: 0 }).sort({ _id: -1 }).skip(+req.params.skip).limit(10).exec((err, data) => {
    if (err) {
      res.json({
        "Data": {},
        "Message": "Can't get product from database,  " + err,
        "Success": false
      })
    }
    else {
      if (data.length == 0) {
        res.json({
          "Data": {},
          "Message": "No Data found in DB",
          "Success": false
        })
      }
      else {
        res.json({
          "Data": data,
          "Message": "Number of all Product:",
          "Success": true
        })
      }
    }
  })
};


module.exports = { addItem, getItems, getOneItem, updateItem, deleteItem, numberOfItem, partOfItem };
