const carItem = require("../../models/CarDetails/sparePartCar");

//create new Item
addItem = (req, res) => {
  const IdVendor = req.user._id;
  console.log("adddittem")
  const body = req.body;
  if (!body) {
    return res.json({
      Data: null,
      Message: "You must provide an item ",
      Success: false,
    });
  }

  const car = new carItem(body);
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
    .then(() => {
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

   carItem
    .find({ person: IdVendor }, (error, items) => {
      if (error || items.length == 0) {
        return res.json({
          Data: error,
          Message: "Item not found",
          Success: false,
        });
      }
      return res.json({
        Data: items,
        Message: "number of items:"+items.length,
        Success: true,
      });
    })

};

//get One Item
getOneItem = async (req, res) => {
  const IdVendor = req.user._id;

  await carItem
    .findOne({ _id: req.params.id, vendor: IdVendor }, (err, items) => {
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
  const IdVendor = req.user._id;
  let { ...data } = req.body;
  carItem.updateOne({ _id: req.params.id, vendor: IdVendor },
    data, { upsert: true, new: true }, (err, result) => {
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
  const IdVendor = req.user._id;
  carItem.deleteOne({ _id: req.params.id, vendor: IdVendor }, (err, data) => {
    if (err) {
      res.json({
        "Data": {},
        "Message": "Can't delete item from database",
        "Success": false
      })
    }
    else {
      if (data.n == 0) {
        res.json({
          "Data": {},
          "Message": "Data with that id: " + req.params.id + " don't exist",
          "Success": false
        })
      }

      else {
        res.json({
          "Data": {},
          "Message": "Done delete",
          "Success": true
        })
      }
    }
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
  carItem.find({ vendor: IdVendor }, { __v: 0 }).sort({ _id: -1 }).skip(+req.params.skip).limit(10).exec((err, data) => {
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
