const httpProxy = require('http-proxy');

const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const DB_URL = `${DB_HOST}:${DB_PORT}/_db/${DB_NAME}/`;

const FoxxProxy = httpProxy.createProxyServer({
  target: DB_URL,
  auth: `${DB_USER}:${DB_PASSWORD}`,
});

const proxyResult = async (req, res) => {
  console.log(`redirecting to Foxx ${req.path}`);
  FoxxProxy.web(req, res);
};

module.exports = proxyResult;
