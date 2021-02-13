const FeedBack = require("../../models/Feedback/feedback");
const carItem = require("../../models/CarDetails/sparePartCar");
const Vendor = require("../../models/Person/Vendor/vendor");

writeFeedback = (req, res) => {
  // {
  //     comment:String,
  //     rating:Number,
  //     car:IDitem,
  // }
  const body = req.body;

  const IdUser = req.user._id;

  if (!(body.car && (body.comment || body.rating))) {
    return res.json({
      Data: null,
      Message: "You must provide a feedback ",
      Success: false,
    });
  }

  const feedback = new FeedBack({ ...body });
  feedback.user = IdUser;

  if (!feedback) {
    return res.json({
      Data: err, //null insteat
      Message: "You must provide a feedback",
      Success: false,
    });
  }

  feedback
    .save()
    .then((data) => {
      carItem
        .updateOne(
          { _id: req.body.car },
          { $push: { feedback: data._id} }
        )
        .then(console.log("Done"));

      return res.json({
        Data: data._id,
        Message: "Thank you very much",
        Success: true,
      });
    })
    .catch((error) => {
      return res.json({
        Data: error.message,
        Message: "You must provide a feedback",
        Success: false,
      });
    });
};

removeFeedback = async (req, res) => {
 const IdUser = req.user._id;

  FeedBack.findOneAndDelete({ _id: req.params.id,user : IdUser}, (err, data) => {
    if (err) {
      return res.json({
        Data: {},
        Message: "Can't delete item from database",
        Success: false,
      });
    }

    if (!data) {
      return res.json({
        Data: data.n,
        Message: "Data with that id: " + req.params.id + " don't exist",
        Success: false,
      });
    }

    carItem
      .updateOne({ _id: data.car }, { $pull: { feedback: data._id } })
      .then("Done");

    return res.json({
      Data: {},
      Message: "Done delete",
      Success: true,
    });
  });
};

module.exports = { writeFeedback, removeFeedback };
