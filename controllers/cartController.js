const Product = require("../models/Product");
const Cart = require("../models/cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
  const { name, description, price } = request.body;

  try {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw new Error("Invalid price");
    }

    const product = new Product(name, description, parsedPrice);
    Product.add(product); 
    Cart.add(name);      

    response.status(STATUS_CODE.OK).redirect("/products/new");
  } catch (error) {
    response.status(STATUS_CODE.NOT_FOUND).json({ success: false, message: error.message });
  }
};

exports.getProductsCount = (request, response) => {
  try {
    const quantity = Cart.getProductsQuantity();
    response.status(STATUS_CODE.OK).json({ quantity });
  } catch (error) {
    response.status(STATUS_CODE.NOT_FOUND).json({ success: false, message: error.message });
  }
};
