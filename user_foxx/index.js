"use strict";

const joi = require("joi");
const query = require("@arangodb").query;
const createRouter = require("@arangodb/foxx/router");

const router = createRouter();

module.context.use(router);

router
  .get("/:id", (req, res) => {
    const { id } = req.pathParams;
    const userKey = `users/${id}`;

    const user = query`RETURN DOCUMENT(${userKey})`.toArray()[0];

    res.send(user);
  })
  .response(joi.object().required(), "user collection")
  .summary("get user by id")
  .description("get user by id");
