const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const routers = require('./routers');

const { PORT } = process.env;

const app = express();

const errorMiddleware = (err, _req, res, _next) => {
  if (err.msg) {
    res.status(err.status).json({
      msg: err.msg,
      status: err.status,
      errors: err.errors,
    });
  } else {
    console.log({ err });
    res.status(500).json({
      msg: 'Something went wrong',
      status: 500,
    });
  }
};

try {
  app
    .use(cors())
    .use(bodyParser.json())
    .get('/isalive', (_req, res) => {
      res.sendStatus(200);
    })
    .use('/user', routers.userRouter)
    .use('*', routers.unknownRouter)
    .use(errorMiddleware)
    .listen(
      PORT,
      console.log({
        Message: 'Server Online!',
        Port: `${PORT}`,
      }),
    );
} catch (serverError) {
  console.error({
    ErrorPayload: serverError,
  });
}
