const joi = require("joi");

const SessionController = require("../controllers/sessions");

module.exports = (router) => {
  router
    .post("/login", (req, res) => {
      const { username, password } = req.body;
      const success = SessionController.login(username, password, req);

      if (success) res.send({ success });
      else res.throw("unauthorized");
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
        const { role, username, password } = req.body;

        SessionController.signup({ role, username, password }, req, res);
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

  router
    .get("/whoami", function (req, res) {
      try {
        const user = SessionController.whoami(req);
        res.send(user);
      } catch (e) {
        res.send({ user: null });
      }
    })
    .response(joi.object().required(), "user object")
    .summary("whoami")
    .description("Returns the currently active user.");
};
