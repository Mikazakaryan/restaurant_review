const axios = require('axios');
const Router = require('express');
const Serializer = require('../serializers');

const router = Router();

const { DB_HOST } = process.env;

router.get('/', async (req, res, next) => {
  try {
    const { userKey } = req.query;
    const { data: restaurants } = await axios({
      method: 'get',
      data: { userKey },
      url: `${DB_HOST}/restaurant`,
      headers: { 'Content-Type': 'application/json' },
    });

    const serializedRestaurants = Serializer.serialize(
      'userRestaurantList',
      restaurants,
    );

    res.status(200).json(serializedRestaurants);
  } catch (err) {
    next(err);
  }
});

router.post('/rate/:restaurantKey', async (req, res, next) => {
  try {
    const { feedback, userKey } = req.body;
    const { restaurantKey } = req.params;

    const { data: restaurants } = await axios({
      method: 'post',
      url: `${DB_HOST}/restaurant/rate`,
      data: { ...feedback, userKey, restaurantKey },
      headers: { 'Content-Type': 'application/json' },
    });

    const serializedRestaurants = Serializer.serialize(
      'userRestaurantList',
      restaurants,
    );

    res.status(200).json(serializedRestaurants);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
