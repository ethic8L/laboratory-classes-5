const Product = require("../models/Product");
const Cart = require("../models/cart"); 
const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

exports.getProductsView = (request, response) => {
  const products = Product.getAll();
  const cartCount = Cart.getProductsQuantity(); 

  response.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
    cartCount, 
  });
};

exports.getAddProductView = (request, response) => {
  const cartCount = Cart.getProductsQuantity(); 

  response.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
    cartCount, 
  });
};

exports.getNewProductView = (request, response) => {
  const newestProduct = Product.getLast();
  const cartCount = Cart.getProductsQuantity();

  response.render("new-product.ejs", {
    headTitle: "Shop - New product",
    path: "/new",
    activeLinkPath: "/products/new",
    menuLinks: MENU_LINKS,
    newestProduct,
    cartCount, 
  });
};

exports.getProductView = (request, response) => {
  const name = request.params.name;
  const product = Product.findByName(name);
  const cartCount = Cart.getProductsQuantity(); 

  response.render("product.ejs", {
    headTitle: "Shop - Product",
    path: `/products/${name}`,
    activeLinkPath: `/products/${name}`,
    menuLinks: MENU_LINKS,
    product,
    cartCount, 
  });
};

exports.deleteProduct = (request, response) => {
  const name = request.params.name;
  Product.deleteByName(name);

  response.status(STATUS_CODE.OK).json({ success: true });
};
