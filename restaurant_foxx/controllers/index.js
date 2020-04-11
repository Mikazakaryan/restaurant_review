const ratesController = require("./ratesController");
const repliesController = require("./repliesController");
const restaurantsController = require("./restaurantsController");

module.exports = {
  ...ratesController,
  ...repliesController,
  ...restaurantsController,
};
