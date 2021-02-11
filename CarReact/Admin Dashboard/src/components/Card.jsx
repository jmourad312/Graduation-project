import { Button } from '../components/Button'
import { instance } from "../network/axiosConfig";


export function Card(props) {
  return (
    <div className="col-4 productComp mb-2 blog-post">
      <section className="cards">
        <article
          className="card card--1"
          onClick={() => props.details(props.id)}
        >
          <div
            className="card__img"
            style={{ background: `url(${props.image})` }}
          ></div>
          <p className="card_link">
            <div
              className="card__img--hover"
              style={{ background: `url(${props.image})` }}
            ></div>
          </p>
          <div className="card__info">
            <h4 className="card__title text-truncate">{props.title}</h4>
            <span
              className="price"
              style={{
                fontWeight: "600",
                color: "goldenrod",
                fontSize: "25px",
              }}
            >
              {props.price} LE
            </span>{" "}
            <br />
            <p className="text-truncate">{props.description}</p>
            <span className="card__by">
              by{" "}
              <span className="card__author" title="author">
                {props.name}
              </span>
            </span>
            <br />
            <small>
              <i className="badge badge-dark">{props.brand}</i>
              <i className="badge badge-dark">{props.model}</i>
            </small>
          </div>

    <div className="col-4 productComp mb-2 blog-post" >
        <section className="cards">
          <article className="card card--1">
            <div className="card__img" style={{ background: `url(${props.image})` }}></div>
            <p className="card_link">
              <div className="card__img--hover" style={{ background: `url(${props.image})` }} ></div>
            </p>
            <div className="card__info">
              <h4 className="card__title text-truncate">{props.title}</h4>
              <span className="price" style={{ fontWeight: "600", color: "goldenrod", fontSize: "25px" }}>{props.price} LE</span> <br />
              <p className="text-truncate">{props.description}</p>
              <span className="card__by">by <span className="card__author" title="author">{props.name}</span></span>
              <br />
              <small>
                <i className="badge badge-dark">{props.brand}</i>
                <i className="badge badge-dark">{props.model}</i>
              </small>
            </div>

            <div className="d-flex">

              <Button className="btn btn-info mx-auto m-2" parameter={props.dataItem} key={props.id} handelClick={props.edit}
                name={<i style={{ fontSize: '20px' }} className='fas fa-pen'></i>}>
              </Button>

              <Button className="btn btn-danger mx-auto m-2" parameter={props.dataItem} key={props.id} handelClick={props.delete}
                name={<i style={{ fontSize: '20px' }} className='fas fa-trash'></i>}>
              </Button>

              </div>
          </article>
        </section>
      </div>
  );
}
