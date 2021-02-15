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

  if (!(body.car && body.rating)) {
    return res.json({
      Data: null,
      Message: "You must provide a feedback ",
      Success: false,
    });
  }

  const findUserFeedback = FeedBack.findOne({ user: IdUser, car: body.car });

  if (findUserFeedback.length > 0) {

    FeedBack.updateOne({ user: IdUser, car: body.car }, { ...body })
      .then((data) => {
        return res.json({
          Data: data.n,
          Message: "Update your feedback",
          Success: true,
        });
      })
      .catch((error) => {
        return res.json({
          Data: error.message,
          Message: "Can't Rate",
          Success: false,
        });
      });

  } else {
    const feedback = new FeedBack({ ...body });
    feedback.user = IdUser;

    feedback
      .save()
      .then((data) => {
        carItem
          .updateOne({ _id: req.body.car }, { $push: { feedback: data._id } })
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
  }
};

module.exports = { writeFeedback };
