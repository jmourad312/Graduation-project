import React from 'react'

export default function ProductComp() {
    return (
        <div className="product row">
            <div className="col-md-4 mb-3">
                <div className="card h-100">
                    <div className="d-flex justify-content-between position-absolute w-100">
                        <div className="label-new">
                            <span className="text-white bg-success small d-flex align-items-center px-2 py-1">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <span className="ml-1">New</span>
                            </span>
                        </div>
                        <div className="label-sale">
                            <span className="text-white bg-primary small d-flex align-items-center px-2 py-1">
                                <i className="fa fa-tag" aria-hidden="true"></i>
                                <span className="ml-1">Sale</span>
                            </span>
                        </div>
                    </div>
                    <a href="#">
                        <img src="https://picsum.photos/700/550" className="card-img-top" alt="Product" />
                    </a>
                    <div className="card-body px-2 pb-2 pt-1">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="h4 text-primary">$129,99</p>
                            </div>
                            <div>
                                <a href="#" className="text-secondary lead" data-toggle="tooltip" data-placement="left" title="Compare">
                                    <i className="fa fa-line-chart" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <p className="text-warning d-flex align-items-center mb-2">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </p>
                        <p className="mb-0">
                            <strong>
                                <a href="#" className="text-secondary">Product Title</a>
                            </strong>
                        </p>
                        <p className="mb-1">
                            <small>
                                <a href="#" className="text-secondary">Brands</a>
                            </small>
                        </p>
                        <div className="d-flex mb-3 justify-content-between">
                            <div>
                                <p className="mb-0 small"><b>UPC: </b> 2310010</p>
                                <p className="mb-0 small"><b>PART#: </b> 2121</p>
                                <p className="mb-0 small"><b>MPN#: </b> mpn22651</p>
                            </div>
                            <div className="text-right">
                                <p className="mb-0 small"><b>Free Shipping</b></p>
                                <p className="mb-0 small"><b>MSRP: </b> $119.99</p>
                                <p className="mb-0 small"><b>REG: </b> $19.99</p>
                                <p className="mb-0 small text-primary">
                                    <span className="font-weight-bold">Save</span> $20.00 (16%)
                    </p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col px-0">
                                <button className="btn btn-outline-primary btn-block">
                                    Add To Cart
                      <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className="ml-2">
                                <a href="#" className="btn btn-outline-success" data-toggle="tooltip" data-placement="left" title="Add to Wishlist">
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card h-100">
                    <div className="labels d-flex justify-content-between position-absolute w-100">
                        <div className="label-new">
                        </div>
                        <div className="label-sale">
                            <span className="text-white bg-primary small d-flex align-items-center px-2 py-1">
                                <i className="fa fa-tag" aria-hidden="true"></i>
                                <span className="ml-1">Sale</span>
                            </span>
                        </div>
                    </div>
                    <a href="#">
                        <img src="https://picsum.photos/700/550" className="card-img-top" alt="Product" />
                    </a>
                    <div className="card-body px-2 pb-2 pt-1 d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="h4 text-primary">$130,00</p>
                            </div>
                            <div>
                                <a href="#" className="text-secondary lead" data-toggle="tooltip" data-placement="left" title="Compare">
                                    <i className="fa fa-line-chart" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <p className="text-warning d-flex align-items-center mb-2">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </p>
                        <p className="mb-0">
                            <strong>
                                <a href="#" className="text-secondary">Product Title</a>
                            </strong>
                        </p>
                        <p className="mb-1">
                            <small>
                                <a href="#" className="text-secondary">Brands</a>
                            </small>
                        </p>
                        <div className="d-flex mb-3 justify-content-between">
                            <div>
                                <p className="mb-0 small"><b>PART#: </b> 2121</p>
                                <p className="mb-0 small"><b>MPN#: </b> mpn22651</p>
                            </div>
                            <div className="text-right">
                                <p className="mb-0 small"><b>MSRP: </b> $119.99</p>
                                <p className="mb-0 small"><b>REG: </b> $19.99</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-auto">
                            <div className="col px-0">
                                <button className="btn btn-outline-primary btn-block">
                                    Add To Cart
                      <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className="ml-2">
                                <a href="#" className="btn btn-outline-success" data-toggle="tooltip" data-placement="left" title="Add to Wishlist">
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card h-100">
                    <div className="labels d-flex justify-content-between position-absolute w-100">
                        <div className="label-new">
                            <span className="text-white bg-success small d-flex align-items-center px-2 py-1">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <span className="ml-1">New</span>
                            </span>
                        </div>
                        <div className="label-sale">
                            <span className="text-white bg-primary small d-flex align-items-center px-2 py-1">
                                <i className="fa fa-tag" aria-hidden="true"></i>
                                <span className="ml-1">Sale</span>
                            </span>
                        </div>
                    </div>
                    <a href="#">
                        <img src="https://picsum.photos/700/550" className="card-img-top" alt="Product" />
                    </a>
                    <div className="card-body px-2 pb-2 pt-1">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="h4 text-primary">$150,20</p>
                            </div>
                            <div>
                                <a href="#" className="text-secondary lead" data-toggle="tooltip" data-placement="left" title="Compare">
                                    <i className="fa fa-line-chart" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <p className="text-warning d-flex align-items-center mb-2">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </p>
                        <p className="mb-0">
                            <strong>
                                <a href="#" className="text-secondary">Product Title</a>
                            </strong>
                        </p>
                        <p className="mb-1">
                            <small>
                                <a href="#" className="text-secondary">Brands</a>
                            </small>
                        </p>
                        <div className="d-flex mb-3 justify-content-between">
                            <div>
                                <p className="mb-0 small"><b>UPC: </b> 2310010</p>
                                <p className="mb-0 small"><b>PART#: </b> 2121</p>
                                <p className="mb-0 small"><b>MPN#: </b> mpn22651</p>
                            </div>
                            <div className="text-right">
                                <p className="mb-0 small"><b>Free Shipping</b></p>
                                <p className="mb-0 small"><b>MSRP: </b> $119.99</p>
                                <p className="mb-0 small"><b>REG: </b> $19.99</p>
                                <p className="mb-0 small text-primary">
                                    <span className="font-weight-bold">Save</span> $20.00 (16%)
                    </p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col px-0">
                                <button className="btn btn-outline-primary btn-block">
                                    Add To Cart
                      <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className="ml-2">
                                <a href="#" className="btn btn-outline-success" data-toggle="tooltip" data-placement="left" title="Add to Wishlist">
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

