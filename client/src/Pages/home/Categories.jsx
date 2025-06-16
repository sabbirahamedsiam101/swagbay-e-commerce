import { Link } from "react-router";
import Loading from "../../Components/Loading";
import { useCategories } from "../../hooks/useCategories";

function Categories() {
  const { categories, isCategoryLoading, error } = useCategories();

  if (isCategoryLoading) return <Loading />;
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
