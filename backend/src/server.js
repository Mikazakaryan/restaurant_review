const express = require('express');

require('./config/dotenv');

const corsMiddleware = require('./middlewares/cors');
const proxyMiddleware = require('./middlewares/proxyMiddleware');

const { PORT } = process.env;

const App = express();

App.use(corsMiddleware)
  .all('/auth/*', proxyMiddleware)
  .all('/restaurant/*', proxyMiddleware)
  .all('/*', (_req, res) => {
    res.status(404).json({
      data: null,
      error: {
        message: 'route not found',
      },
    });
  });

App.listen(Number(PORT), () => console.log(`Listening to localhost:${PORT}`));
