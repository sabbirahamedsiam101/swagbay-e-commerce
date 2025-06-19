import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/products/prodcutsApi";
import Loading from "../../../../Components/Loading";
import { useCategories } from "../../../../hooks/useCategories";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, isCategoryLoading, error } = useCategories();

  const { data: { data: product = {} } = {}, isLoading } =
    useFetchProductByIdQuery(id);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    oldPrice: "",
    discountType: "",
    discountValue: "",
    stock: "",
    isFeatured: false,
    tags: "",
    image: "",
    color: "",
    rating: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        tags: product.tags?.join(", ") || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };
    try {
      await updateProduct({ id, ...updatedData }).unwrap();
      alert("Product updated successfully");
      navigate("/dashboard/manage-products");
      console.log("Updated data:", updatedData);
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  if (isLoading || isCategoryLoading) return <Loading />;

  // console.log("Product data:", product);
  // console.log("Form data:", formData);
  return (
    <section className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
          required
        />

        {/* Category */}
        {/* <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
          required
        /> */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
          required
        >
          <option value="">Select Category</option>

          {isCategoryLoading && <option disabled>Loading categories...</option>}

          {error && <option disabled>Error loading categories</option>}

          {!isCategoryLoading &&
            !error &&
            categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </option>
            ))}
        </select>
        {/* Color */}
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />

        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
          rows={3}
        />

        {/* Price + Old Price */}
        <div className="flex gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border px-4 py-2 w-full rounded"
          />
          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={formData.oldPrice}
            onChange={handleChange}
            className="border px-4 py-2 w-full rounded"
          />
        </div>

        {/* Discount Type + Value */}
        <div className="flex gap-4">
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="border px-4 py-2 w-full rounded"
          >
            <option value="">Discount Type</option>
            <option value="percent">Percent</option>
            <option value="flat">Flat</option>
          </select>
          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            value={formData.discountValue}
            onChange={handleChange}
            className="border px-4 py-2 w-full rounded"
          />
        </div>

        {/* Stock + Rating */}
        <div className="flex gap-4">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border px-4 py-2 w-full rounded"
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="border px-4 py-2 w-full rounded"
          />
        </div>

        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />

        {/* Is Featured */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          <span>Featured Product</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;
