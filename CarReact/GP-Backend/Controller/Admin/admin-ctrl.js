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
    Brand.updateOne({ _id: req.params.id }, { $push: { carModel: model._id } })

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

getBrand = (req, res) => {
    Brand.find({}, { name: 1, _id: 1 }, (error, data) => {
        if (error || data.length == 0) {
            return res.status(400).json({
                Data: null,
                Message: "Brand not found",
                Success: false,
            });
        }
        return res.status(200).json({
            Data: data,
            Message: "احلى براند لاحلى زبون",
            Success: true,
        });

    })
}

getModel = (req, res) => {
    Brand.find({ name: req.params.name }, { carModel:1 }).populate( { path: "carModel", select: "model" }

    ).exec((error, data) => {
        if (error || data.length == 0) {
            return res.status(400).json({
                Data: null,
                Message: "Model not found",
                Success: false,
            });
        }
        return res.status(200).json({
            Data: data,
            Message: "احلى موديل لاحلى زبون",
            Success: true,
        });
    })
}

module.exports = { addModel, addBrand, getBrand, getModel }