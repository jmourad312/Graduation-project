import React, { useEffect } from "react";
// import blogItems from '../../../../assets/js/blogItems'
import AddBlog from "../../../../components/AddBlog";
import BlogEntry from "../../../../components/BlogEntry";
import BlogFilter from "../../../../components/BlogFilter";
import {useDispatch, useSelector} from 'react-redux';
// import Button from "../../../../components/Button";
import { getBlogsAction } from "../../../../store/actions";
import Loading from '../../../../components/Loading';
import { motion } from "framer-motion";
import LoginButton from "../../../../components/LoginButton";
import UserIcon from "../../../../components/UserIcon";

export default function BlogList() {
  
  
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  // const getBlogs = () =>{
  //  dispatch(getBlogsAction());
  // }

  useEffect(() => {
    // getBlogs();
  },[blogs]);
    // useEffect(() => {
    //   getBlogs();
    // }, []);

  // const items = [];
  // blogs.Data.forEach(element => {
  //   items.push(element)
  // });
  function createItem (blog) {
    // return <BlogEntry
    //   key={blog.id}
    //   imgClass={blog.imgClass}
    //   imgSrc={blog.imgSrc}
    //   imgAlt={blog.imgAlt}
    //   badgeClass={blog.badgeClass}
    //   badgeValue={blog.badgeValue}
    //   cardTitle={blog.cardTitle}
    //   userName={blog.userName}
    //   date={blog.date}
    //   cardContent={blog.cardContent}
    //   cardBrand={blog.cardBrand}
    //   cardModel={blog.cardModel}
    //   replies={blog.replies}
    // />
    return (
      <BlogEntry
        key={blog._id}
        id={blog._id}
        // imgClass={blog.imgClass}
        imgSrc={blog.images?blog.images[0]:blog.images}
        // imgAlt={blog.imgAlt}
        badgeClass={blog.state ? "badge-primary" : null}
        // badgeValue={blog.badgeValue}
        cardTitle={blog.title}
        userName={blog.person.firstName ? blog.person.firstName : "User"}
        date={blog.createdAt}
        cardContent={blog.body}
        cardBrand={blog.brand}
        cardModel={blog.model}
        // replies={blog.price}
      />
    );
  }
  // const blogs = useSelector(state => state.blogs);
const pageVariants = {
  in: {
    opacity: 10,
    y: "0vh",
    scale: 1,
  },
  out: {
    opacity: 0,
    y: "-100vh",
    scale: 0.1,
  },
};
const pageTransitions = {
  duration: 1.5,
  type: "tween",
  ease: "anticipate",
};
  return (
    <motion.section
      className="blog"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <section className="container">
        {localStorage.getItem("Authorization") === null && <LoginButton />}
        {localStorage.getItem("Authorization") !== null && <UserIcon />}

        {/* <Button onClick={getProducts} value={"SHOW ITEMS"} /> */}
        {/* <AddBlog /> */}
        <div className="row">
          <div className="col-3" style={{ marginTop: "10%" }}>
            <BlogFilter class="blog-filter" />
          </div>
          <div className="col-9 blog-contents">
            <section>
              <div className="row">
                {blogs.Data ? blogs.Data.map(createItem) : <Loading />}
              </div>
            </section>
          </div>
        </div>
      </section>
    </motion.section>
  );
}

