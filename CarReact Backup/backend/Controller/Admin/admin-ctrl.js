const Brand = require('../../models/CarDetails/carBrand')
const Model = require('../../models/CarDetails/carModel')

addBrand = (req, res) => {
    const brand = new Brand(req.body);
    brand.save()

        .then((data) => {
            return res.status(200).json({
                Data: data,
                Message: "done add brand",
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

addModel = (req, res) => {
    const model = new Model(req.body);
    model.save();
    Brand.updateOne({_id:req.params.id},{$push:{carModel:model._id}})

        .then((data) => {
            return res.status(200).json({
                Data: data.n,
                Message: "done add brand",
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
}

module.exports = { addModel, addBrand }