// import React from "react";
// import category1 from "../../assets/category-1.jpg";
// import category2 from "../../assets/category-2.jpg";
// import category3 from "../../assets/category-3.jpg";
// import category4 from "../../assets/category-4.jpg";
// import { Link } from "react-router";
// function Categories() {
//   const categories = [
//     { name: "Accessories", path: "accessories", image: category1 },
//     { name: "Dress Collection", path: "dress", image: category2 },
//     { name: "Jewellery", path: "jewellery", image: category3 },
//     { name: "Cosmetics", path: "cosmetics", image: category4 },
//   ];
//   return (
//     <>
//       <div className="product__grid">
//         {categories.map((category, index) => (
//           <Link to={`/categories/${category.path}`} key={index} className="categories__card">
//             <img src={category.image} alt={category.name} />
//             <h4>{category.name}</h4>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Categories;

import React from "react";
import { Link } from "react-router";
import Loading from "../../Components/Loading";
import { useFetchAllCategoriesQuery } from "../../redux/features/categories/categoryApi";

function Categories() {
  const {
    data: { data: categories } = [],
    isLoading,
    error,
  } = useFetchAllCategoriesQuery();

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Failed to load categories</p>;
  // console.log("category data", categories);
  return (
    <div className="product__grid">
      {categories.map((category) => (
        <Link
          to={`/categories/${category.slug}`}
          key={category._id}
          className="categories__card"
        >
          <img
            src={category.image || "/placeholder.jpg"}
            alt={category.name}
            className="w-full h-40 object-cover rounded"
          />
          <h4 className="text-center mt-2 font-semibold">{category.name}</h4>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
