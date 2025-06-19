// import { Link } from "react-router";
// import Loading from "../../Components/Loading";
// import { useCategories } from "../../hooks/useCategories";

// function Categories() {
//   const { categories, isCategoryLoading, error } = useCategories();

//   if (isCategoryLoading) return <Loading />;
//   if (error) return <p className="text-red-500">Failed to load categories</p>;
//   return (
//     <div className="product__grid">
//       {categories.map((category) => (
//         <Link
//           to={`/categories/${category.slug}`}
//           key={category._id}
//           className="categories__card"
//         >
//           <img
//             src={category.image || "/placeholder.jpg"}
//             alt={category.name}
//             className="w-full h-40 object-cover rounded"
//           />
//           <h4 className="text-center mt-2 font-semibold">{category.name}</h4>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Categories;
import { Link } from "react-router";
import Loading from "../../Components/Loading";
import { useCategories } from "../../hooks/useCategories";

function Categories() {
  const { categories, isCategoryLoading, error } = useCategories();

  if (isCategoryLoading) return <Loading />;
  if (error) return <p className="text-red-500">Failed to load categories</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            to={`/categories/${category.slug}`}
            key={category._id}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all bg-white"
          >
            <img
              src={category.image || "/placeholder.jpg"}
              alt={category.name}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <h4 className="text-white text-lg font-semibold tracking-wide">
                {category.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
