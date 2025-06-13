import React, { useState } from "react";
import { useFetchAllProductsQuery } from "../../../../redux/features/products/prodcutsApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../../../Components/Pagination";
import Loading from "../../../../Components/Loading";

const categories = ["all", "accessories", "dress", "jewellery", "cosmetics"];
const colors = ["all", "black", "red", "gold", "blue", "silver", "beige", "green"];

const ManageProducts = () => {
  const [filters, setFilters] = useState({
    category: "all",
    color: "all",
    search: "",
  });

  const [page, setPage] = useState(1);
  const limit = 5;

  const { category, color, search } = filters;

  const {
    data: { data: products = [], totalPages = 1 } = {},
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
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product ID:", id);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <section className="p-4 bg-white rounded shadow">
      {/* Filter Panel */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleFilterChange}
          placeholder="Search by product name..."
          className="border px-4 py-2 rounded w-full md:w-1/3 focus:outline-primary"
        />
        <div className="flex flex-col gap-3 w-full md:flex-row md:gap-4 md:w-2/3">
          <select
            name="category"
            value={category}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded w-full md:w-1/2 focus:outline-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            name="color"
            value={color}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded w-full md:w-1/2 focus:outline-primary"
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className=" relative">
       <table className="w-full min-w-[1000px] overflow-x-auto table-auto border-collapse">
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
                      className="max-w-16 h-12 object-cover rounded border"
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
