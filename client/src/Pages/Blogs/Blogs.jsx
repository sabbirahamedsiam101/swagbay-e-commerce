import React from "react";

import blogsData from "../../data/blogs.json";

const Blogs = () => {
  // console.log(blogsData);
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Latest From Blog</h2>
      <p className="section__subheader">
        {" "}
        Elevate your wardrobe with our freshest style tips, trends, and
        inspiration on our blog .
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-12 px-[3vw]">
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={blog.imageUrl} alt="blog image" className="h-[200px]" />
            <div className="blog__card__content">
              <h6>{blog.subtitle}</h6>
              <h4>{blog.title}</h4>
              <p>{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
