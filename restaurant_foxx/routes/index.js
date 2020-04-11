const userRoutes = require("./userRoutes");
const adminRouter = require("./adminRouter");
const ownerRoutes = require("./ownerRoutes");

module.exports = (router) => {
  userRoutes(router);
  adminRouter(router);
  ownerRoutes(router);
};
