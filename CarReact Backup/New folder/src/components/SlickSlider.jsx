import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from "react-slick";
import { setProductId } from '../store/actions';


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,  transform:"scale(3)",paddingLeft:"0.5px",borderRadius:"100%",fontSize:"3rem" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,transform:"scale(3)",paddingRight:"60px",fontSize:"3rem" }}
      onClick={onClick}
    />
  );
}



export default function SlickSlider(props) {
  const dispatch = useDispatch();
  var history = useHistory();

  const handleClick = (params) => {
    dispatch(setProductId(params));
    localStorage.setItem("ProductID", params);
    history.push(`/ProductDetails/${params}`);
    axios
      .put(
        `http://localhost:3000/user/recentlyViewed`,
        { id: props.id },
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      )
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
          // props.history.push("/MyProfile");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const settings = {
    dots: true,
    infinite: true,
    pauseOnHover: true,
    slidesToShow: props.items.length === 1 ? 1 : props.items.length === 2 ? 2 : 3,
    slidesToScroll: 1,
    //   autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <Slider {...settings}>
        {props.items.map((item, index) => {
          return (
            <div className="SliderStyle">
              <div className="productList">
                <section className="cards">
                  <article
                    className="card card--1"
                    onClick={() => handleClick(item._id)}
                  >
                    <div
                      className="card__img"
                      style={{ background: `url(${item.image})` }}
                    ></div>
                    <p className="card_link">
                      <div
                        className="card__img--hover"
                        style={{ background: `url(${item.image})` }}
                      ></div>
                    </p>
                    <div className="card__info">
                      <h4 className="card__title text-truncate">{item.name}</h4>
                      <span
                        className="price"
                        style={{
                          fontWeight: "600",
                          color: "goldenrod",
                          fontSize: "25px",
                        }}
                      >
                        {item.price} LE
                      </span>{" "}
                      <p className="text-truncate">{item.description}</p>
                      <strong>
                        <i className="badge badge-dark">{item.carBrand}</i>{"  "}
                        <i className="badge badge-dark">{item.carModel}</i>
                      </strong>
                    </div>
                  </article>
                </section>
              </div>
            </div>
          );
        })}

      </Slider>
    </div>
  );
}
