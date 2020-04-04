const axios = require('axios');
const crypto = require('crypto');
const Router = require('express');
const Serializer = require('../serializers');

const error = require('./utils/error');
const owasp = require('../config/owasp');

const router = Router();

const { DB_HOST } = process.env;

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return error(res, 404, 'Missing Params');

    const hash = crypto.createHash('sha256');

    const { data: userObj } = await axios({
      method: 'post',
      url: `${DB_HOST}/user/login/`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        username,
        password: hash.update(password).digest('hex'),
      },
    });

    if (userObj.err) return error(res, 404, userObj.message);

    const serializedUser = Serializer.serialize('user', userObj);
    res.status(200).json(serializedUser);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { role, username, password, confirmPassword } = req.body;

    if (!role || !username || !password || !confirmPassword)
      return error(res, 404, 'Missing Params');

    const passErrors = owasp.test(password).errors;
    if (passErrors.length) return error(res, 404, passErrors.join(' '));

    if (password !== confirmPassword) return error(res, 404, 'Wrong Params');

    const hash = crypto.createHash('sha256');

    const { data: userObj } = await axios({
      method: 'post',
      url: `${DB_HOST}/user/signup/`,
      headers: { 'Content-Type': 'application/json' },
      data: { role, username, password: hash.update(password).digest('hex') },
    });

    if (userObj.err) return error(res, 404, userObj.message);

    const serializedUser = Serializer.serialize('user', userObj);
    res.status(200).json(serializedUser);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data: userObj } = await axios.get(`${DB_HOST}/user/${id}`);
    const serializedUser = Serializer.serialize('user', userObj);
    res.status(200).json(serializedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
