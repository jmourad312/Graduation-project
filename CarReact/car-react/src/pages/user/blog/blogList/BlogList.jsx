import React, { useEffect } from "react";
// import blogItems from '../../../../assets/js/blogItems'
import AddBlog from "../../../../components/AddBlog";
import BlogEntry from "../../../../components/BlogEntry";
import BlogFilter from "../../../../components/BlogFilter";
import {useDispatch, useSelector} from 'react-redux';
// import Button from "../../../../components/Button";
import { getBlogsAction } from "../../../../store/actions";
import Loading from '../../../../components/Loading';

export default function BlogList() {
  
  
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const getBlogs = () =>{
  //  dispatch(getBlogsAction());
  }

  useEffect(() => {
    getBlogs();
  }, [blogs]);
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
        imgSrc={blog.images}
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

  return (
    <section className="blog">
      <section className="container">
        <AddBlog />
        {/* <Button onClick={getProducts} value={"SHOW ITEMS"} /> */}
        <div className="row">
          <BlogFilter class="col-3 blog-filter" />
          <div className="col-9 blog-contents">
            <section>
              <div className="row">
                {blogs.Data?blogs.Data.map(createItem):<Loading />}
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

