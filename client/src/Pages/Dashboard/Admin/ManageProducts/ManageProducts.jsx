import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../../redux/features/products/prodcutsApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../../../Components/Pagination";
import Loading from "../../../../Components/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useCategories } from "../../../../hooks/useCategories";
// const categories = ["all", "accessories", "dress", "jewellery", "cosmetics"];
const colors = [
  "all",
  "black",
  "red",
  "gold",
  "blue",
  "silver",
  "beige",
  "green",
];

const ManageProducts = () => {
  const [filters, setFilters] = useState({
    category: "all",
    color: "all",
    search: "",
  });

  const {
    categories,
    isCategoryLoading,
    error: categoriesError,
  } = useCategories();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { category, color, search } = filters;

  const {
    data: { products = [], totalPages = 1 } = {},
    isLoading,
    isError,
    error,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    page,
    limit,
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    console.log("Edit product ID:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/manage-products/update-product/${id}`);
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id).unwrap();
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (error) {
          Swal.fire("Failed!", "Something went wrong while deleting.", "error");
          console.error("Delete error:", error);
        }
      }
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
  console.log("categories", categories);
  return (
    <section className="p-4 bg-white rounded shadow">
      {/* Filter Panel */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleFilterChange}
            placeholder="🔍 Search product..."
            className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="col-span-1 sm:col-span-1 md:col-span-1">
          <select
            name="category"
            value={category}
            onChange={handleFilterChange}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 sm:col-span-1 md:col-span-1">
          <select
            name="color"
            value={color}
            onChange={handleFilterChange}
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex items-center justify-end">
          <button
            onClick={() =>
              setFilters({ category: "all", color: "all", search: "" })
            }
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md text-gray-800"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-center">Edit</th>
              <th className="px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, idx) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{(page - 1) * limit + idx + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-16 h-12 object-cover rounded shadow-lg"
                    />
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3 capitalize">{product.color}</td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </section>
  );
};

export default ManageProducts;
