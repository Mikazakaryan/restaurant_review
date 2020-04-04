const express = require('express');

const error = require('./utils/error');

const unknownRouter = express.Router();

unknownRouter.all('*', (req, res) => {
  const resp = 'Requested resource not found.';

  console.log({
    Path: req.path,
    Message: 'Unknown Router',
  });

  return error(res, 404, resp);
});

module.exports = unknownRouter;
