const joi = require("joi");

const Serializer = require("../serializers");
const UserController = require("../controllers/user");
const SessionController = require("../controllers/sessions");

module.exports = (router) => {
  router
    .delete("/user", (req, res) => {
      const [users, err] = UserController.deleteUser(req, req.body);

      if (err) {
        res.throw("unauthorized");
      } else {
        const serializedUsers = Serializer.serialize("user", users);
        res.send(serializedUsers);
      }
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
        })
        .required(),
      "Credentials"
    )
    .response(joi.object().required(), "Users Collections")
    .summary("delete user")
    .description("delete user as admin by key");

  router
    .put("/user", (req, res) => {
      const [users, err] = UserController.editUser(req, req.body);

      if (err) {
        res.throw("unauthorized");
      } else {
        const serializedUsers = Serializer.serialize("user", users);
        res.send(serializedUsers);
      }
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
          role: joi.string().required(),
          username: joi.string().required(),
        })
        .required(),
      "Credentials"
    )
    .response(joi.object().required(), "Users Collections")
    .summary("Edit user as admin")
    .description("Edit user as admin by key");

  router
    .get("/all", (req, res) => {
      const [users, err] = UserController.getAll(req);

      if (err) {
        res.throw("unauthorized");
      } else {
        const serializedUsers = Serializer.serialize("user", users);
        res.send(serializedUsers);
      }
    })
    .response(joi.object().required(), "Users Collections")
    .summary("Get all as admin")
    .description("Get all as admin by key");

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
        const serializedUser = Serializer.serialize("user", user);
        res.send(serializedUser);
      } catch (e) {
        res.send({ user: null });
      }
    })
    .response(joi.object().required(), "user object")
    .summary("whoami")
    .description("Returns the currently active user.");
};
