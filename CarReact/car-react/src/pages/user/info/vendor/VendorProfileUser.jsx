import React from "react";

export default function VendorProfileUser() {
  return (
    <section className="vendor-profile">
      <div className="bg">
        <div className="container">
          {/* <!-- vendor info --> */}
          <h2 className="text-center">Vendor Info</h2>
          <section className="row">
            <div className="media">
              <div className="col-10">
                <div className="media-body">
                  <div className="">
                    <h3><i className="fa fa-envelope fa-1x mr-2" aria-hidden="true"></i>
                      Don't hesitate to contact us
                      </h3>
                    <h5>
                      Phone: +1 (0) 000 0000 001 <br/>
                      Email: youremail@mail.com
                    </h5>
                    <iframe 
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+fayuim"
                width="300"
                height="200"
                style={{ border: "rgb(0, 0, 0) solid", borderRadius: "5%" }}
                allowfullscreen
              ></iframe>
                  </div>
                </div>
              </div>
              
              <div className="col-4">
                <img
                  className="rounded-circle"
                  style={{ width: "100%", height: "100%" }}
                  src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                  alt="Generic placeholder"
                />
              </div>
            </div>
          </section>
          {/* <hr className="hr " /> */}
          {/* <!-- map & address --> */}
          {/* <h1 className="text-center">Vendor's Location</h1>
          <div className="row">
          <div className="centercontent">
              <iframe 
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+fayuim"
                width="300"
                height="200"
                style={{ border: "rgb(0, 0, 0) solid", borderRadius: "5%" }}
                allowfullscreen
              ></iframe>
          </div>
          </div> */}
          <hr className="hr " />

          {/* <!-- items --> */}
          <h2 className="text-center mb-3">Available Items</h2>
          <section className="row">
            <div className="container">
              <div className="row">
                {/* <!-- <div className="col-6">
                              <h3 className="mb-3">Carousel cards title </h3>
                          </div> --> */}
                <div className="m-auto">
                  <a
                    className="btn btn-dark rounded-circle mr-5"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="prev"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </a>
                  <a
                    className="btn btn-dark rounded-circle"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="next"
                  >
                    <i className="fa fa-arrow-right"></i>
                  </a>
                </div>
                <div className="col-12">
                  <div
                    id="carouselExampleIndicators2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="row">
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532781914607-2031eca2f00d?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=7c625ea379640da3ef2e24f20df7ce8d"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=42b2d9ae6feb9c4ff98b9133addfb698"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3d2e8a2039c06dd26db977fe6ac6186a"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row">
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532771098148-525cefe10c23?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3f317c1f7a16116dec454fbc267dd8e4"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532715088550-62f09305f765?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ebadb044b374504ef8e81bdec4d0e840"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=0754ab085804ae8a3b562548e6b4aa2e"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row">
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532763303805-529d595877c5?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=5ee4fd5d19b40f93eadb21871757eda6"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
  );
}
