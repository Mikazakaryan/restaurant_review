const Router = require('express');
const Serializer = require('../serializers');

const UserController = require('../controllers/userController');

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: userObj } = await UserController.getUserByKey({
      userKey: id,
    });
    const serializedUser = Serializer.serialize('user', userObj);
    res.status(200).json(serializedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
