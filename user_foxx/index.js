const createRouter = require("@arangodb/foxx/router");

const routes = require("./routes");
const userSessionMiddleware = require("./middlewares/userSession");

const router = createRouter();

module.context.use(userSessionMiddleware);
module.context.use(router);

routes(router);

module.context.trustProxy = true;
