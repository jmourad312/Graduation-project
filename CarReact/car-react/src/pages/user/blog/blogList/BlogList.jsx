import React from "react";

export default function BlogList() {
  return (
    <section className="blog">
      <section className="container">
        {/* <!-- <div className="container h-100 mb-4">
                <div className="d-flex justify-content-center h-100">
                  <div className="searchbar">
    
                    
                    <input className="search_input" type="text" name="" placeholder="Search...">
                    
                    <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                  </div>
                </div>
        </div> --> */}
        <div className="row">
          <div className="col-lg-3 blog-filter">
            <div className="mb-4 ml-2" filter="price">
              <h6 className="font-weight-bold mb-3">Sort Options</h6>

              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="New" />
                <label className="custom-control-label text-primary mb-2" for="New">
                  New
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="Hot" />
                <label className="custom-control-label text-danger mb-2" for="Hot">
                  Hot
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="Answered"
                />
                <label
                  className="custom-control-label text-success mb-2"
                  for="Answered"
                >
                  Answered
                </label>
              </div>
            </div>
            <div className="mb-5">
              <select name="" id="" className="custom-select custom-select-lg mb-3">
                <option value="BMW">BMW</option>
                <option value="RENAULT">RENAULT</option>
                <option value="MERCEDES">MERCEDES</option>
                <option value="JEEP">JEEP</option>
              </select>

              <p>
                <span className="badge badge-secondary">
                  Mercedes <span className="badge badge-danger">X</span>
                </span>
                <span className="badge badge-secondary">
                  BMW <span className="badge badge-danger">X</span>
                </span>
                <span className="badge badge-secondary">
                  RENAULT <span className="badge badge-danger">X</span>
                </span>
                <span className="badge badge-secondary">
                  JEEP <span className="badge badge-danger">X</span>
                </span>
              </p>
            </div>
            <div>
              <select name="" id="" className="custom-select custom-select-sm mb-3">
                <option value="BMWx3">BMW X3</option>
                <option value="BMWx2">BMW X2</option>
                <option value="MERCEDES">MERCEDES A-className</option>
              </select>
              <p>
                <span className="badge badge-secondary">
                  BMW X3 <span className="badge badge-danger">X</span>
                </span>
                <span className="badge badge-secondary">
                  BMW X2<span className="badge badge-danger">X</span>
                </span>
                <span className="badge badge-secondary">
                  MERCEDES A-className<span className="badge badge-danger">X</span>
                </span>
              </p>
            </div>
          </div>
          <div className="col-lg-9 blog-contents">
            <section>
              <div className="row">
                <div className="col-md-6 col-lg-6 mb-4">
                  <div className="card blog-post">
                    <div className="rounded">
                      <img
                        className="img-fluid card-img-top"
                        src="https://cdn.carbuzz.com/gallery-images/840x560/433000/400/433493.jpg"
                        alt="Sample"
                      />
                      <h4 className="mb-0">
                        <span className="badge badge-primary badge-pill">New</span>
                      </h4>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Brakes are faulty</h5>
                      <p className="small text-muted text-uppercase mb-3">
                        by
                        <a href="#!" className="text-reset">
                          <strong>User 10 </strong>
                        </a>
                        <a href="#!" className="text-reset float-right">
                          February 20, 2020
                        </a>
                      </p>
                      <p className="text-multiline-truncate card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Natus, repellendus beatae voluptas placeat maiores
                        possimus ipsa labore culpa modi aut incidunt molestias
                        similique quae? Ullam nemo aliquid facilis magni
                        expedita!
                      </p>
                      <hr />
                      <div className="d-flex justify-content-between text-uppercase text-muted small">
                        <div className="d-flex align-items-center">
                          <i className="mr-2"></i>
                          <a href="#!" className="text-reset">
                            BMW
                          </a>
                          ,
                          <a href="#!" className="text-reset ml-1">
                            BMW 8 series coupe
                          </a>
                        </div>
                        <div className="d-flex align-items-center">
                          <a href="#!" className="text-reset">
                            <i className=" mr-2"></i>1
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 mb-4">
                  <div className="card blog-post">
                    <div className="rounded">
                      <img
                        className="img-fluid card-img-top"
                        src="https://media.ed.edmunds-media.com/bmw/x3-m/2021/oem/2021_bmw_x3-m_4dr-suv_base_fq_oem_9_1600.jpg"
                        alt="Sample"
                      />
                      <h4 className="mb-0">
                        <span className="badge badge-success badge-pill">
                          Answered
                        </span>
                      </h4>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Seat warmers malfunctioning</h5>
                      <p className="small text-muted text-uppercase mb-3">
                        by
                        <a href="#!" className="text-reset">
                          <strong>User 21 </strong>
                        </a>
                        <a href="#!" className="text-reset float-right">
                          February 19, 2020
                        </a>
                      </p>
                      <p className="text-multiline-truncate card-text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Tempora consequuntur optio illo, quae esse,
                        dolores perferendis eaque odit corporis assumenda enim
                        sed iure eligendi earum, nostrum ad saepe? Fugiat, sunt.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloremque fugiat cum saepe tenetur iste veniam harum
                        aut quam rerum repellendus unde accusamus, nobis
                        quisquam. Ullam voluptatum sint id rem consequuntur?
                      </p>
                      <hr />
                      <div className="d-flex justify-content-between text-uppercase text-muted small">
                        <div className="d-flex align-items-center">
                          <i className="mr-2"></i>
                          <a href="#!" className="text-reset">
                            BMW
                          </a>
                          ,
                          <a href="#!" className="text-reset ml-1">
                            BMW X3
                          </a>
                        </div>
                        <div className="d-flex align-items-center">
                          <a href="#!" className="text-reset">
                            <i className=" mr-2"></i>10
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 mb-4">
                  <div className="card blog-post">
                    <div className="rounded">
                      <img
                        className="img-fluid card-img-top"
                        src="https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/1-mercedes-benz-a-className-2018-rt-hero-front.jpg?itok=sI7Ve2Q_"
                        alt="Sample"
                      />
                      <h4 className="mb-0">
                        <span className="badge badge-danger badge-pill">Hot</span>
                      </h4>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Steering not locked error</h5>
                      <p className="small text-muted text-uppercase mb-3">
                        by
                        <a href="#!" className="text-reset">
                          <strong>User 01 </strong>
                        </a>
                        <a href="#!" className="text-reset float-right">
                          February 18, 2020
                        </a>
                      </p>
                      <p className="card-text text-multiline-truncate">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Sed, necessitatibus. Excepturi numquam quis eaque
                        soluta, quo asperiores in maiores neque blanditiis,
                        deleniti deserunt voluptates maxime cum reprehenderit
                        explicabo repellat quibusdam.
                      </p>
                      <hr />
                      <div className="d-flex justify-content-between text-uppercase text-muted small">
                        <div className="d-flex align-items-center">
                          <i className="mr-2"></i>
                          <a href="#!" className="text-reset">
                            Mercedes-Benz
                          </a>
                          ,
                          <a href="#!" className="text-reset ml-1">
                            Mercedes-Benz A-className
                          </a>
                        </div>
                        <div className="d-flex align-items-center">
                          <a href="#!" className="text-reset">
                            <i className="mr-2"></i>20
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
