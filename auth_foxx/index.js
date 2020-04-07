const createRouter = require("@arangodb/foxx/router");
const sessionsMiddleware = require("@arangodb/foxx/sessions");

const routes = require("./routes");
const userSessionMiddleware = require("./userSessionMiddleware");

const router = createRouter();

const sessions = sessionsMiddleware({
  storage: module.context.collection("sessions"),
  transport: "cookie",
});

module.context.use(sessions);
module.context.use(userSessionMiddleware);
module.context.use(router);

routes(router);

module.context.trustProxy = true;
