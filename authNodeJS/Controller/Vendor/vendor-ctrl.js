const carItem = require("../../models/CarDetails/sparePartCar");

//create new car Item
addItem = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.json({
      Data: null,
      Message: "You must provide an item ",
      Success: false,
    });
  }

  const car = new carItem(body);
  if (!car) {
    return res.status(400).json({
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
  await carItem
    .find({}, { _id: 0, image: 1 }, (err, items) => {
      if (err) {
        return res.status(400).json({
          Data: err,
          Message: "You must provide an item ",
          Success: false,
        });
      }
      if (!items.length) {
        return res.status(400).json({
          Data: null,
          Message: "Item not found",
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
        Message: "Item not found ",
        Success: false,
      });
    });
};

//get One Item
getOneItem = async (req, res) => {
  await carItem
    .findOne({ _id: req.params.id }, (err, items) => {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "item not found",
          Success: false,
        });
      }
      if (!items) {
        console.log(items)
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
  let { ...data } = req.body;
  carItem.updateOne({ _id: req.params.id },
    data, { upsert: true,new:true },(err, result)=> {
      if (err) {
        return res.status(400).json({
          Data: null,
          Message: "You can't update an item ",
          Success: false,
        });
      } return res.status(200).json({ 
        Data: result, 
        Message: "You can update an item ", 
        Success: true, });
    });
};

deleteItem = (req, res) => {
  carItem.deleteOne({ _id: req.params.id }, (err, data) => {
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

module.exports = { addItem, getItems, getOneItem, updateItem, deleteItem };
