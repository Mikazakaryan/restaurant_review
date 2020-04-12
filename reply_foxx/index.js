const createRouter = require("@arangodb/foxx/router");

const routes = require("./routes");
const userSessionMiddleware = require("./middlewares/userSession");

const router = createRouter();

module.context.use(router);
module.context.use(userSessionMiddleware);

routes(router);

module.context.trustProxy = true;
