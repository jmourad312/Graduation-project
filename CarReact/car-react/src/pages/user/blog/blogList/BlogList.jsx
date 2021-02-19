import React, { useEffect } from "react";
// import blogItems from '../../../../assets/js/blogItems'
import AddBlog from "../../../../components/AddBlog";
import BlogEntry from "../../../../components/BlogEntry";
import BlogFilter from "../../../../components/BlogFilter";
import { useDispatch, useSelector } from "react-redux";
// import Button from "../../../../components/Button";
import { getBlogsAction, resultFromFilter } from "../../../../store/actions";
import Loading from "../../../../components/Loading";
import { motion } from "framer-motion";
import LoginButton from "../../../../components/LoginButton";
import UserIcon from "../../../../components/UserIcon";
import { Pagination } from "../../../../components/Pagination";
import Logo from "../../../../components/Logo";
import {useTranslation} from "react-i18next";


export default function BlogList() {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resultFromFilter({}, localStorage.getItem("TEST")));
  },[]);

  const handleClick = (params) => {};

  function createItem(blog) {
    return (
      <BlogEntry
        key={blog._id}
        id={blog._id}
        // imgClass={blog.imgClass}
        images={blog.images}
        // imgAlt={blog.imgAlt}
        badgeClass={blog.state ? "badge-primary" : null}
        // badgeValue={blog.badgeValue}
        cardTitle={blog.title}
        userName={blog.person ? blog.person.firstName : "User"}
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
  const {t, i18n} = useTranslation();
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
                {blogs ? (
                  blogs.Success ? (
                    blogs.Data.map(createItem)
                  ) : (
                    <div
                      style={{
                        height: "600px",
                        width: "600px",
                        position: "absolute",
                        left:"15%",
                        top:"25%"
                      }}
                    >
                    <h2 style={{
                          position: "relative",
                          top: "20%",
                          left: "20%",
                          textAlign: "center",
                          fontWeight:"700",
                          fontSize:"32px"
                        }}>
                      {t("BlogList.NoPosts")}
                    </h2>
                    </div>
                  )
                ) : (
                  <Loading />
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </motion.section>
  );
}
