const Contactus = require("../../models/ContactUs/ContactUs");

const sendContactUs = (req, res) => {
  const body = req.body;

  if (!(req.body.email || req.body.message)) {
    return res.json({
      Data: null,
      Message: "You must provide a message and your email ",
      Success: false,
    });
  }

  const contactus = new Contactus(body);
  contactus
    .save()
    .then((data) => {
      return res.json({
        Data: data,
        Message: "we will contact with you as soon as possible",
        Success: true,
      });
    })
    .catch((error) => {
      return res.json({
        Data: error,
        Message: "You must provide a message and your email ",
        Success: false,
      });
    });
};

const getContactUs = (req, res) => {
  Contactus.find({})
    .skip(+req.params.skip)
    .limit(5)
    .exec(async (error, data) => {
      if (error || !data) {
        return res.json({
          Data: error,
          Message: "No data",
          Success: false,
        });
      }

      const number = await Contactus.countDocuments({});
      return res.json({
        Data: data,
        count:number,
        Message: "Done get all MESSAGES",
        Success: true,
      });
    });
};

module.exports = { sendContactUs, getContactUs };
