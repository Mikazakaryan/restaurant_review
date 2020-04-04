"use strict";

const joi = require("joi");
const query = require("@arangodb").query;
const createRouter = require("@arangodb/foxx/router");

const router = createRouter();

module.context.use(router);

router
  .post("/signup", (req, res) => {
    const { role, username, password } = req.body;

    const usernameReserved = query`
      FOR u IN users
        FILTER u.username == ${username}
        LIMIT 1
        RETURN u
    `.toArray()[0];

    if (!!usernameReserved)
      return res.send({ err: true, message: "username already in use" });

    query`INSERT { role: ${role}, username: ${username}, password: ${password} } INTO users`;

    const user = query`
      FOR u IN users
        FILTER u.username == ${username}
        LIMIT 1
        RETURN u
    `.toArray()[0];

    res.send(user);
  })
  .body(
    joi
      .object({
        role: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
      })
      .required(),
    "User signup"
  )
  .response(joi.object().required(), "user collection")
  .summary("signup user")
  .description("signup user");

router
  .post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = query`
    FOR u IN users
      FILTER u.username == ${username} && u.password == ${password}
      LIMIT 1
      RETURN u
  `.toArray()[0];

    res.send(
      user ? user : { err: true, message: "username or password are incorrect" }
    );
  })
  .body(
    joi
      .object({
        username: joi.string().required(),
        password: joi.string().required(),
      })
      .required(),
    "User signup"
  )
  .response(joi.object().required(), "user collection")
  .summary("signup user")
  .description("signup user");

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
