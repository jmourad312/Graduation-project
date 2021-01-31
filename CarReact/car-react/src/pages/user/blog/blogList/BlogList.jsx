import React from "react";
import blogItems from '../../../../assets/js/blogItems'
import BlogEntry from "../../../../components/BlogEntry";
import BlogFilter from "../../../../components/BlogFilter";

export default function BlogList() {

  function createItem (blog) {
    return <BlogEntry
      key={blog.id}
      imgClass={blog.imgClass}
      imgSrc={blog.imgSrc}
      imgAlt={blog.imgAlt}
      badgeClass={blog.badgeClass}
      badgeValue={blog.badgeValue}
      cardTitle={blog.cardTitle}
      userName={blog.userName}
      date={blog.date}
      cardContent={blog.cardContent}
      cardBrand={blog.cardBrand}
      cardModel={blog.cardModel}
      replies={blog.replies}


    />
  }


  return (
    <section className="blog">
      <section className="container">
        <div className="row">
          <BlogFilter class="col-3 blog-filter"/>
          <div className="col-9 blog-contents">
            <section>
              <div className="row">{blogItems.map(createItem)}</div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
