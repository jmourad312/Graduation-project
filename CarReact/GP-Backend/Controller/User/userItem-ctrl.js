const carItem = require("../../models/CarDetails/sparePartCar");
const Person = require("../../models/Person/person")

// favourite item 
// last seen item 
// click item show items details 
// click vendor name show profile vendor 
// rate item
// write feedback item
//show all item search ------->>>>>

// get part of product 
partOfItem = (req, res) => {
    const populateQuery = { path: "person", select: "firstName" };

    carItem.find({}, { name: 1, price: 1, description: 1, image: 1, carModel: 1, carBrand: 1 }).populate(populateQuery).sort({ _id: -1 }).skip(0).limit(12).exec((err, data) => {
        if (err || data.length == 0) {
            return res.json({
                "Data": err,
                "Message": "No Data found in DB",
                "Success": false
            })
        }

        return res.json({
            "Data": data,
            "Message": `6 protuct `,
            "Success": true
        })
    })

};

// show all posts of all users
showDetailsItem = (req, res) => {
    const populateQuery = { path: "person", select: "firstName" }
    carItem.findOne({ _id: req.params.id }, { name: 1, price: 1, description: 1, image: 1, carModel: 1, carBrand: 1 }).populate(populateQuery).exec(
        (error, data) => {
            if (error || data.length == 0) {
                return res.json({
                    Data: error,
                    Message: "no product found",
                    Success: false,
                });
            }
            return res.json({
                Data: data,
                Message: "Details product",
                Success: true,
            });
        })
}

showFilterItems = (req, res) => {
    // Filter BY => search,priceLessThan,priceMoreThan,carBrand,carModel

    const criteriaSearch = { $regex: req.body.search, $options: 'i' };
    const queryCond = {}

    if (req.body.priceLessThan && req.body.priceMoreThan) {
        queryCond.$and = [
            { price: { $gte: req.body.priceMoreThan } },
            { price: { $lte: req.body.priceLessThan } }
        ]
    }

    if (req.body.search) {
        queryCond.$or = [{ name: criteriaSearch }, { description: criteriaSearch }]
    }

    if (req.body.carBrand) {
        queryCond.carBrand = req.body.carBrand;
    }
    if (req.body.carModel) {
        queryCond.carModel = req.body.carModel;
    }

    console.log(queryCond)
    const populateQuery = [{ path: "person", select: "firstName" }];

    carItem.find(
        queryCond
        , { __v: 0 })
        .sort({ _id: -1 })
        .populate(populateQuery)
        .skip(0)
        .limit(9)
        .exec(
            (error, data) => {
                if (error || data.length == 0) {
                    return res.json({
                        Data: error,
                        Message: "no blogs found",
                        Success: false,
                    });
                }
                return res.json({
                    Data: data,
                    Message: `posts: filter ${data.length}`,
                    Success: true,
                });
            })
};

module.exports = { partOfItem, showFilterItems, showDetailsItem }