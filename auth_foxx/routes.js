const joi = require("joi");

const SessionController = require("./sessionController");

module.exports = (router) => {
  router
    .post("/login", (req, res) => {
      SessionController.login(req.body, req, res);

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
    .post("/signup", function (req, res) {
      try {
        SessionController.signup(req.body, req, res);
        res.send({ success: true });
      } catch (e) {
        // Failed to save the user
        // We'll assume the uniqueness constraint has been violated
        res.throw("bad request", "Username already taken", e);
      }
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
    .post("/logout", function (req, res) {
      try {
        SessionController.logout(req);
      } catch (error) {
        console.debug(`No valid session was found: ${req.session}`);
      }

      res.send({ success: true });
    })
    .response(joi.object().required(), "status")
    .summary("logout")
    .description("logout user");
};
