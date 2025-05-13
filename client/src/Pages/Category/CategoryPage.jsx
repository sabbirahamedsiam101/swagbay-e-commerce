import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import products from "../../data/products.json";
import ProductCards from "../Shop/ProductCards";
function CategoryPage() {
  const { categoryName } = useParams();
  console.log("the category name is", categoryName);
  const [fillterdProducts, setFillterdProducts] = useState([]);
  useEffect(() => {
    const fillterd = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );
    setFillterdProducts(fillterd);
    console.log(fillterd);
  }, [categoryName]);
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today !
        </p>
      </section>
      {/* prodcut cards */}
      <div className="section__container">
            <ProductCards products={fillterdProducts} />
      </div>
    </>
  );
}

export default CategoryPage;
