export function Card(props) {

  return (

    <div className="col-4 productComp mb-2" >
      <div className="productList">
        <section className="cards">
          <article className="card card--1" onClick={() => props.details(props.id)}>
            <div className="card__info-hover">
              <i className="fas fa-bookmark"></i>

            </div>
            <div className="card__img" style={{background: `url(${props.image})`}}></div>
            <p className="card_link">
              <div className="card__img--hover" style={{background: `url(${props.image})`}} ></div>
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
          </article>
        </section>
      </div>
    </div >
  );
}
