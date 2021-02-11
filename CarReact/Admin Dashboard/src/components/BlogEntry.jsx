import { Button } from "../components/Button";

export default function BlogEntry(props) {
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4 mb-4 blog-post">
        <section className="cards">
          <article
            className="card card--1"
            onClick={() => props.details(props.id)}
          >
            <div className="card__info-hover">
              <i className="fas fa-bookmark"></i>
              <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 24 24">
                  <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>
                <span className="card__time">{props.date}</span>
              </div>
            </div>
            <div
              className="card__img"
              style={{ background: `url(${props.imgSrc})` }}
            ></div>
            <p className="card_link">
              <div
                className="card__img--hover"
                style={{ background: `url(${props.imgSrc})` }}
              ></div>
            </p>
            <div className="card__info">
              <h3 className="card__title text-truncate">{props.cardTitle}</h3>
              <span className="card__by">
                by{" "}
                <span className="card__author" title="author">
                  {props.userName}
                </span>
              </span>
              <br />
              <small>
                <i className="badge badge-dark">{props.cardBrand}</i>
                <i className="badge badge-dark">{props.cardModel}</i>
              </small>
            </div>
            <div className="d-flex">
              <Button
                className="btn btn-info mx-auto m-2"
                parameter={props.id}
                key={props.id}
                handelClick={props.handelClickEdit}
                name={
                  <i style={{ fontSize: "20px" }} className="fas fa-pen"></i>
                }
              ></Button>

              <Button
                className="btn btn-danger mx-auto m-2"
                parameter={props.id}
                key={props.id}
                handelClick={props.handelClickDelete}
                name={
                  <i style={{ fontSize: "20px" }} className="fas fa-trash"></i>
                }
              ></Button>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
