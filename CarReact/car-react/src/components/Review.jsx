import axios from "axios";
import React, { useState } from "react";

export default function Review() {
  const [reviewValue, setReviewValue] = useState({
    comment:"",
    rating:1,
  });
  const [state, setState] = useState({
    over:"hidden",
    height:"0"
  })
  const handleCommentChange = (event) => {
  const { value, name } = event.target;
  console.log(reviewValue);

  setReviewValue((previous) => {
    return {
      ...previous,
      [name]: value,
    };
  });
  console.log(reviewValue);
  };

  const handleAddReview = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const body = {
      car: localStorage.getItem("ProductID"),
      comment: reviewValue.comment,
      rating: reviewValue.rating
    };
    const URL = "http://localhost:3000/user/writeFeedback";
    axios
      .post(URL, body, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      setReviewValue({
        comment:"",
        rating:null
      })
    };
    const Cancelreview = (event)=>{
    event.preventDefault();

      setReviewValue({
        comment: "",
        rating: "",
      });
      console.log(reviewValue);
      setState({over:"hidden",height:"0"})
    }



  
  return (
    <div className="review">
      <div class="cont">
        <div class="stars">
          <form>
            <input
              onClick={() => setState({ over: "visible", height: "100px" })}
              class="star star-5"
              id="star-5-2"
              type="radio"
              name="rating"
              onChange={handleCommentChange}
              value={5}
            />
            <label class="star star-5" for="star-5-2"></label>
            <input
              onClick={() => setState({ over: "visible", height: "100px" })}
              class="star star-4"
              id="star-4-2"
              type="radio"
              name="rating"
              onChange={handleCommentChange}
              value={4}
            />
            <label class="star star-4" for="star-4-2"></label>
            <input
              onClick={() => setState({ over: "visible", height: "100px" })}
              class="star star-3"
              id="star-3-2"
              type="radio"
              name="rating"
              onChange={handleCommentChange}
              value={3}
            />
            <label class="star star-3" for="star-3-2"></label>
            <input
              onClick={() => setState({ over: "visible", height: "100px" })}
              class="star star-2"
              id="star-2-2"
              type="radio"
              name="rating"
              onChange={handleCommentChange}
              value={2}
            />
            <label class="star star-2" for="star-2-2"></label>
            <input
              onClick={() => setState({ over: "visible", height: "100px" })}
              class="star star-1"
              id="star-1-2"
              type="radio"
              name="rating"
              onChange={handleCommentChange}
              value={1}
            />
            <label class="star star-1" for="star-1-2"></label>
            <div
              class="rev-box"
              style={{ overflow: state.over, height: state.height }}
            >
              <textarea
                class="review"
                col="30"
                name="comment"
                onChange={handleCommentChange}
                value={reviewValue.comment}
              ></textarea>
              <button
                className="btn btn-light btn-outline-dark mb-5 mt-2"
                onClick={handleAddReview}
              >
                Add review
              </button>
              <button
                className="btn btn-light btn-outline-danger mb-5 mt-2"
                onClick={Cancelreview}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
