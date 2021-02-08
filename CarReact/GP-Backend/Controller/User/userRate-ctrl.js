const FeedBack = require("../../models/Feedback/feedback");
const carItem = require("../../models/CarDetails/sparePartCar");
const Vendor = require("../../models/Person/Vendor/vendor")

writeFeedback = (req, res) => {

    // {
    //     comment:String,
    //     rating:Number,
    //     car:IDitem,
    //     vendor:IDperson   
    // }
    const body = req.body

    const IdUser = req.user._id;

    if (!body) {
        return res.json({
            Data: null,
            Message: "You must provide a feddback ",
            Success: false,
        });
    }

    const feedback = new FeedBack({ ...body });
    feedback.user = IdUser;
    if (body.vendor) { feedback.vendor = body.vendor }
    if (body.car) { feedback.car = body.car }


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

            if (req.body.vendor) {
                Vendor.updateOne(
                    { person: req.body.vendor },
                    { $push: { vendorFeedBack: data._id } }).then(console.log("Done"))
            }

            if (req.body.car) {
                carItem.updateOne(
                    { _id: req.body.car },
                    { $push: { feedback:{$each:[data._id]}  } }).then(console.log("Done"))
            }

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

    FeedBack.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.json({
                "Data": {},
                "Message": "Can't delete item from database",
                "Success": false
            })
        }

        if (data.n == 0) {
            return res.json({
                "Data": data.n,
                "Message": "Data with that id: " + req.params.id + " don't exist",
                "Success": false
            })
        }

        Vendor.updateOne({ person: data.vendor }, { $pull: { vendorFeedBack: data._id } }).then("Done")

        carItem.updateOne({ _id: data.car }, { $pull: { feedback: data._id } }).then("Done")

        return res.json({
            "Data": {},
            "Message": "Done delete",
            "Success": true
        })
    })
};


module.exports = { writeFeedback, removeFeedback }