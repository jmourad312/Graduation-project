const Ads = require("../../models/Independace/ads");

//add
// delete

addAds = (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const images = [];
  req.files.map((file) => {
    images.push("http://localhost:3000/images/" + file.filename);
    // console.log(images);
  });

  const Ad = new Ads({ ...body, images });

  Ad.save()

    .then((data) => {
      return res.status(200).json({
        Data: data,
        Message: "done add Ad",
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

deleteAds = (req, res) => {
  const IdAd = req.params.id;
  Ads.deleteOne({ _id: IdAd }, (err, data) => {
    if (err) {
      res.json({
        Data: {},
        Message: "Can't delete Ads from database",
        Success: false,
      });
    } else {
      if (data.n == 0) {
        res.json({
          Data: {},
          Message: "Data with that id: " + req.params.id + " don't exist",
          Success: false,
        });
      } else {
        res.json({
          Data: {},
          Message: "Your Ad is deleted successfully ",
          Success: true,
        });
      }
    }
  });
};

showVAds = (req, res) => {
  Ads.find({}, { __v: 0 }).skip(+req.params.skip).limit(5)
  .exec( async (err, data) => {
    if (err) {
      return res.status(400).json({
        Data: err,
        Message: "خلاص شوفت طريق السلامة انت بقا يا فرج يا خويا ",
        Success: false,
      });
    } else {
      const number = await Ads.countDocuments({});

      return res.status(200).json({
        Data: data,
        count:number,
        Message: "هيييييه وصل وصل عبده موته وصال يا حارة ",
        Success: true,
      });
    }
  });
};

module.exports = { addAds, deleteAds,  showVAds};
