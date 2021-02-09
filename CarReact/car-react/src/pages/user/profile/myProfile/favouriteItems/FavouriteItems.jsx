import { motion } from 'framer-motion'
import React from 'react'
// import Review from '../../../../../components/Review'

export default function FavouriteItems(props) {
    return (
      <motion.div
        className="FavouriteItems"
        initial="out"
        animate="in"
        exit="out"
        variants={props.variants}
        transition={props.transition}
      >
        <div className="container">
          <div className="card">
            <img
              className="card-img-top"
              src="https://pngimage.net/wp-content/uploads/2018/05/exhaust-png-3.png"
              alt="Card image"
            />
            <div className="card-body">
              <h4 className="card-title">John Doe</h4>
              <p className="card-text">some example text.</p>
              <a href="#" className="btn btn-success">
                Details
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
}
