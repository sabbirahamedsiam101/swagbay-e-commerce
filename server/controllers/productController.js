import Product from "../models/products.model.js";
import Review from "../models/reviews.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      oldPrice,
      image,
      color,
      rating,
    } = req.body;
    if (!name || !category || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(" the product id is", req.user.id);
    const newProduct = new Product({
      name,
      category,
      description,
      price,
      oldPrice,
      image,
      color,
      rating,
      author: req?.user?.id, // from token payload
    });

    const savedProduct = await newProduct.save();
    // calculate review
    const reviews = await Review.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {
      category = "all",
      color = "all",
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = "newest",
    } = req.query;
    let filter = {};

    // Filter: Category
    if (category !== "all") {
      filter.category = category.toLowerCase();
    }

    // Filter: Color
    if (color && color !== "all") {
      filter.color = { $regex: new RegExp(color, "i") };
    }

    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    // Sorting
    let sortOptions = {};
    switch (sortBy) {
      case "priceLowToHigh":
        sortOptions.price = 1;
        break;
      case "priceHighToLow":
        sortOptions.price = -1;
        break;
      case "newest":
      default:
        sortOptions.createdAt = -1;
    }
    console.log("Filter options:", filter);
    const totalProducts = await Product.countDocuments(filter);
    console.log("Total products found:", totalProducts);
    const totaPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
      totalProducts,
      totalPages: totaPages,
      currentPage: parseInt(page),
    });
    console.log("Products retrieved successfully", products);
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("author", "name email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Calculate average rating

    const reviews = await Review.find({ productId: product._id }).populate(
      "author",
      "name email"
    );

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
      reviews,
    });
  } catch (error) {
    console.error("Error retrieving product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating the product", error);
    res.status(500).send({ message: "Failed to update the product" });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    // delete reviews related to the product
    await Review.deleteMany({ productId: productId });

    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting the product", error);
    res.status(500).send({ message: "Failed to delete the product" });
  }
};

// related products
export const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );
    const relatedProducts = await Product.find({
      id: { $ne: id }, // Exclude the current product
      $or: [
        { name: { $regex: titleRegex } }, // Match similar names
        { category: product.category }, // Match the same category
      ],
    });

    res.status(200).send({ relatedProducts });

    I;
  } catch (error) {
    console.error("Error fetching the related products", error);
    res.status(500).send({ message: "Failed to fetch related products" });
  }
};
