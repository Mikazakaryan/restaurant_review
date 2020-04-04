const Router = require('express');
const Serializer = require('../serializers');

const UserController = require('../controllers/userController');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    //
  } catch (err) {
    next(err);
  }
});

module.exports = router;
