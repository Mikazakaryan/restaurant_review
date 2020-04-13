const joi = require("joi");

const sessionController = require("./sessionController");

module.exports = (router) => {
  router
    .post("/login", (req, res) => {
      sessionController.login(req, res);
      res.send({ success: true });
    })
    .body(
      joi
        .object({
          username: joi.string().required(),
          password: joi.string().required(),
        })
        .required(),
      "Credentials"
    )
    .response(joi.object().required(), "status")
    .summary("login")
    .description("Login with existing user");

  router
    .post("/signup", (req, res) => {
      sessionController.signup(req, res);
      res.send({ success: true });
    })
    .body(
      joi
        .object({
          role: joi.string().required(),
          username: joi.string().required(),
          password: joi.string().required(),
        })
        .required(),
      "Credentials"
    )
    .response(joi.object().required(), "status")
    .summary("signup")
    .description("Creates a new user and and log in");

  router
    .post("/logout", (req, res) => {
      sessionController.logout(req);
      res.send({ success: true });
    })
    .response(joi.object().required(), "status")
    .summary("logout")
    .description("logout user");
};
