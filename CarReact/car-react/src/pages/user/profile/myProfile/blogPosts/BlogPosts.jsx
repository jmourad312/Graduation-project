import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import SimpleDelete from "../../../../../components/SimpleDelete";
// import Footer from '../../../../../layout/footer/Footer'

export default function BlogPosts(props) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="MyBlogPosts"
        initial="out"
        animate="in"
        exit="out"
        variants={props.variants}
        transition={props.transition}
      >
        <div className="container mt-3">
          {props.postsUser.map((post) => {
            return (
              <div className="media border p-3" key={post._id}>
                <img
                  src={post.image}
                  alt="John Doe"
                  className="mr-3 rounded-circle"
                />
                <div className="media-body">
                  <h4>
                    {post.title}
                    <small>
                      <i>Posted on {post.createdAt}</i>
                    </small>
                  </h4>
                  <p>{post.body}</p>
                  <small>
                    <i className="badge badge-light">{post.brand}</i>{" "}
                    <i className="badge badge-light">{post.model}</i>
                  </small>
                </div>
                <SimpleDelete id={post._id} />
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
