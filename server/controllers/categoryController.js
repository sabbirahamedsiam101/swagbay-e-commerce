import Category from "../models/categories.model.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image } = req.body;

    const exists = await Category.findOne({ slug });
    if (exists)
      return res.status(409).json({ message: "Category already exists" });

    const category = new Category({ name, slug, description, image });
    await category.save();

    res.status(201).json({ message: "Category created", data: category });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating category", error: err.message });
  }
};

// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ data: categories });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: err.message });
  }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ data: category });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching category", error: err.message });
  }
};

// UPDATE CATEGORY
export const updateCategoryById = async (req, res) => {
  try {
    const { name, slug, description, image, isActive } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, description, image, isActive },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated", data: category });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating category", error: err.message });
  }
};

// DELETE CATEGORY
export const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: err.message });
  }
};
