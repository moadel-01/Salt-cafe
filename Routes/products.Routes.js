const prodController = require("../Controllers/productsController");
const { upload } = require("../middlewares/uploadMiddleware");
const prodRouter = require("express").Router();

prodRouter.post("/", upload.single("thumbnail"), prodController.createProduct);

prodRouter.get("/", prodController.getAllProducts);
prodRouter.get("/categories/:category", prodController.getProductsUsingCategory);
prodRouter.get("/:id", prodController.getSingleProduct);

prodRouter.delete("/:id", prodController.deleteProduct);

prodRouter.patch("/:id", prodController.updateProduct);

module.exports = { prodRouter };
