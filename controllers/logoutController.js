const { LOGOUT_LINKS } = require("../constants/navigation");
const logger = require("../utils/logger");
const Cart = require("../models/cart"); 

exports.getLogoutView = (request, response) => {
  const cartCount = Cart.getProductsQuantity(); 

  response.render("logout.ejs", {
    headTitle: "Shop - Logout",
    path: "/logout",
    activeLinkPath: "/logout",
    menuLinks: LOGOUT_LINKS,
    cartCount, 
  });
};

exports.killApplication = (request, response) => {
  logger.getProcessLog();
  process.exit();
};
