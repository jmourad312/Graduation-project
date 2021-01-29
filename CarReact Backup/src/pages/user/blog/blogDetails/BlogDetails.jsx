import React from 'react'

export default function BlogDetails() {
    return (
      <div className="container p-5">
        <div>
          <p
            className="font-weight-bold"
            style={{ fontSize: "26px", marginBottom: "0" }}
          >
            Car Owner Question with some details that will help other to answer
          </p>
          <p>
            by <a href=""> CarQuestionOWner</a>
          </p>
          <hr />
          <p>
            <span style={{ color: "gray" }}>Asked</span> 1/10/2021{" "}
            <span style={{ color: "gray" }}> Viewed </span> 3
            <span className="badge badge-success">Answerd</span>
          </p>
          <hr />
          <h5 className="mt-0">Post Details</h5>
          <p>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin. Cras purus odio, vestibulum in
            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            vulputate fringilla. Donec lacinia congue felis in faucibus.
          </p>
          <hr />
          <img src="http://placehold.it/500x600" alt=""/>
          <hr />
          <p>
            {" "}
            <span className="text-secondary">Tags</span>{" "}
            <span className="badge badge-info">BMW</span>
            <span className="badge badge-info">BMW2</span>
            <span className="badge badge-info">BMW3</span>
          </p>
        </div>

        {/* <!-- Comments Form --> */}
        <div className="card my-4">
          <h5 className="card-header">Leave a Comment:</h5>
          <div className="card-body">
            <form>
              <div className="form-group">
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* <!-- Single Comment --> */}
        <div className="media mb-4">
          <img
            className="d-flex mr-3 rounded-circle"
            src="http://placehold.it/50x50"
            alt=""
          />
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin. Cras purus odio, vestibulum in
            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            vulputate fringilla. Donec lacinia congue felis in faucibus.
          </div>
        </div>

        {/* <!-- Comment with nested comments --> */}
        <div className="media mb-4">
          <img
            className="d-flex mr-3 rounded-circle"
            src="http://placehold.it/50x50"
            alt=""
          />
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin. Cras purus odio, vestibulum in
              vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
            <div className="media mt-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
            </div>

            <div className="media mt-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2>Related Questions</h2>
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="card" style={{width: "18rem"}}>
                <img
                  className="card-img-top"
                  src="http://placehold.it/300x150"
                  width="300px"
                  height="150px"
                  alt="Card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick content.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" style={{width: "18rem"}}>
                <img
                  className="card-img-top"
                  src="http://placehold.it/300x150"
                  width="300px"
                  height="150px"
                  alt="Card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick content.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" style={{width: "18rem"}}>
                <img
                  className="card-img-top"
                  src="http://placehold.it/300x150"
                  width="300px"
                  height="150px"
                  alt="Card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
