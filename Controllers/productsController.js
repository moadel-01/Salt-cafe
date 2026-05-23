const { Product } = require("../tempModels/product");
const {
  productValidation,
  updateProductValidation,
} = require("../Validations/productsValidations");

async function createProduct(req, res) {
  try {
    const thumbnail = req.file.path;

    const { error, value } = productValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = { ...value, thumbnail };

    const finalProduct = await Product.create(product);

    res.status(200).json({ message: "product created", data: finalProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    res.status(200).json({ message: "all products", data: products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSingleProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product found", data: product });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(400).jso({ message: "Invalid ID" });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    const { error, value } = updateProductValidation.validate(req.body);
    if (error) {
      return res.status(404).json({ error: error.details[0].message });
    }

    const product = await Product.findByIdAndUpdate(id, value);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product updated" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

async function getProductsUsingCategory(req, res) {
  try {
    const { category } = req.params;

    const products = await Product.find({ category: category });
    const total = await Product.find({ category: category }).countDocuments();

    res
      .status(200)
      .json({ message: `all ${category} products`, data: { products, total } });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getProductsUsingCategory,
};
