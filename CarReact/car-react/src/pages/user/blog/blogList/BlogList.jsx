import React, { useEffect } from "react";
// import blogItems from '../../../../assets/js/blogItems'
import AddBlog from "../../../../components/AddBlog";
import BlogEntry from "../../../../components/BlogEntry";
import BlogFilter from "../../../../components/BlogFilter";
import {useDispatch, useSelector} from 'react-redux';
// import Button from "../../../../components/Button";
import { getProductsAction } from "../../../../store/actions";

export default function BlogList() {
  
  const products = useSelector(state => state.products);
  console.log(products);
  const dispatch = useDispatch();
  console.log(products);
  const getProducts = () =>{
    dispatch(getProductsAction("asa"));
  }
  console.log(products);

  useEffect(() => {  
    getProducts();
  }, [])

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
        key={blog.id}
        imgClass={blog.imgClass}
        imgSrc={blog.image}
        imgAlt={blog.imgAlt}
        badgeClass={blog.badgeClass}
        badgeValue={blog.badgeValue}
        cardTitle={blog.title}
        userName={blog.category}
        date={blog.date}
        cardContent={blog.description}
        cardBrand={blog.cardBrand}
        cardModel={blog.cardModel}
        replies={blog.price}
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
              <div className="row">{products.map(createItem)}</div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
