const carItem = require("../../models/CarDetails/sparePartCar");

// favourite item 
// last seen item 
// click item show items details 
// click vendor name show profile vendor 
// rate item
// write feedback item
//show all item search ------->>>>>

// get part of product 
partOfItem = (req, res) => {

    carItem.find({}, { __v: 0 }).sort({ _id: -1 }).skip(+req.params.skip).limit(10).exec((err, data) => {
        if (err || data.length == 0) {
            return res.json({
                "Data": err,
                "Message": "No Data found in DB",
                "Success": false
            })
        }

        return res.json({
            "Data": data,
            "Message": `10 protuct `,
            "Success": true
        })
    })

};

module.exports = { partOfItem }