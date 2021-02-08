const Ads = require("../../models/Independace/ads");

// show adds

showAds = (req, res) => {
  Ads.find({}, { __v: 0 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        Data: err,
        Message: "خلاص شوفت طريق السلامة انت بقا يا فرج يا خويا ",
        Success: false,
      });
    } else {
      return res.status(200).json({
        Data: data,
        Message: "هيييييه وصل وصل عبده موته وصال يا حارة ",
        Success: true,
      });
    }
  });
};

module.exports = { showAds };
