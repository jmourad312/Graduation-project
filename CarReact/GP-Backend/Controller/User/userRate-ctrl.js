const FeedBack = require("../../models/Feedback/feedback");
const Rate = require("../../models/Feedback/rate");
const carItem = require("../../models/CarDetails/sparePartCar");
const Vendor = require("../../models/Person/Vendor/vendor");

writeFeedback = (req, res) => {
  // {
  //     comment:String,
  //     car:IDitem,
  // }

  const body = req.body;

  if (!(body.car && body.comment)) {
    return res.json({
      Data: null,
      Message: "You must provide a feedback ",
      Success: false,
    });
  }

  const IdUser = req.user._id;
  const findUserFeedback = FeedBack.findOne({ user: IdUser, car: body.car });

  if (findUserFeedback.length > 0) {
    return res.json({
      Data: null,
      Message: "can't write feedback again",
      Success: false,
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

removeFeedback = async (req, res) => {
  const IdUser = req.user._id;

  FeedBack.findOneAndDelete(
    { _id: req.params.id, user: IdUser },
    (err, data) => {
      if (err || !data) {
        return res.json({
          Data: err,
          Message: "Can't delete item from database",
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
    }
  );
};

rateItem = (req, res) => {
  // {
  //     rating:Number,
  //     car:IDitem,
  // }
  const body = req.body;
  if (!(body.car && body.rating)) {
    return res.json({
      Data: null,
      Message: "You must provide a rate ",
      Success: false,
    });
  }

  const IdUser = req.user._id;
  const findUserRate = Rate.findOne({ user: IdUser, car: body.car });
  if (findUserRate.length > 0) {
    Rate.updateOne({ user: IdUser, car: body.car }, { rating: req.body.rating })
      .then((data) => {
        return res.json({
          Data: data.n,
          Message: "Update your Rate",
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
    const rate = new Rate({ ...body });
    rate.user = IdUser;
    rate
      .save()
      .then((data) => {
        carItem
          .updateOne({ _id: req.body.car }, { $push: { rate: data._id } })
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

module.exports = { writeFeedback, removeFeedback, rateItem };
