import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAddProductMutation } from "../../../redux/features/products/prodcutsApi";
import { useCategories } from "../../../hooks/useCategories";

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { categories, isCategoryLoading, error } = useCategories();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };
    try {
      await addProduct(newProduct).unwrap();
      alert("Product added successfully");
      navigate("/dashboard/manage-products");
    } catch (error) {
      alert("Failed to add product: " + error.message);
    }
  };

  return (
    <section className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
          required
        />
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

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
          rows={3}
        />
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
            min="0"
            max="5"
            onChange={handleChange}
            className="border px-4 py-2 w-full rounded"
          />
        </div>
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="border px-4 py-2 w-full rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          <span>Featured Product</span>
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default AddNewProduct;
