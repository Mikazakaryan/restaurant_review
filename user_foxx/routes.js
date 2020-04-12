const joi = require("joi");

const Serializer = require("./serializers");
const UserController = require("./userController");
const isAdminMiddleware = require("./middlewares/isAdmin");

module.exports = (router) => {
  router
    .get("/whoami", function (req, res) {
      try {
        const user = UserController.whoami(req);

        const serializedUser = Serializer.serialize("user", user);
        res.send(serializedUser);
      } catch (e) {
        res.send({ user: null });
      }
    })
    .response(joi.object().required(), "user object")
    .summary("whoami")
    .description("Returns the currently active user.");

  router.all("*", isAdminMiddleware);

  router
    .get("/all", (_req, res) => {
      const users = UserController.getAll();

      const serializedUsers = Serializer.serialize("user", users);
      res.send(serializedUsers);
    })
    .response(joi.object().required(), "Users Collections")
    .summary("Get all as admin")
    .description("Get all as admin by key");

  router
    .put("/:id", (req, res) => {
      const users = UserController.editUser(req);

      const serializedUsers = Serializer.serialize("user", users);
      res.send(serializedUsers);
    })
    .pathParam("id", joi.string().required(), "key of the user to be edited")
    .body(
      joi
        .object({
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
    .delete("/:id", (req, res) => {
      UserController.deleteUser(req);

      res.send({ success: true });
    })
    .pathParam("id", joi.string().required(), "key of the user to be edited")
    .response(joi.object().required(), "Users Collections")
    .summary("delete user")
    .description("delete user as admin by key");
};
