const products = require("../data/products");

const getAllProducts = async (req, res) => {
  try {
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getAllProducts };
