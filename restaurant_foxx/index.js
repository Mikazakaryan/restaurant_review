"use strict";

const joi = require("joi");
const db = require("@arangodb").db;
const query = require("@arangodb").query;
const createRouter = require("@arangodb/foxx/router");

const router = createRouter();

module.context.use(router);

const getRestaurants = (userId) =>
  query`    
    FOR restaurant IN restaurants
      LET ratings =  (
        FOR user, vote IN 1..1 INBOUND restaurant hasRated
        RETURN vote.rating
      )

      RETURN merge(restaurant, {
        isRated: HAS(
          FIRST(
            FOR vote, edge IN 1..1 INBOUND restaurant hasRated
            FILTER edge._from == ${userId}  
            RETURN edge   
          ), 
        '_id'),
        lastRate: FIRST(
          FOR user, vote IN 1..1 INBOUND restaurant hasRated
          SORT vote.date DESC
          LIMIT 1
          RETURN vote
        ),
        lowestRate: LAST(ratings),
        highestRate: FIRST(ratings),
        rating: SUM(ratings) / LENGTH(ratings)
      })
    `.toArray();

router
  .post("/rate", (req, res) => {
    const { userKey, restaurantKey, date, rating, comment } = req.body;

    const userId = `users/${userKey}`;
    const restaurantId = `restaurants/${restaurantKey}`;

    db._collection("hasRated").insert({
      _from: userId,
      rating: rating,
      comment: comment,
      _to: restaurantId,
      date: new Date(date),
    });

    const restaurants = getRestaurants(userId);

    res.send(restaurants);
  })
  .body(
    joi
      .object({
        date: joi.string().required(),
        rating: joi.number().required(),
        comment: joi.string().required(),
        userKey: joi.string().required(),
        restaurantKey: joi.string().required(),
      })
      .required(),
    "rate restaurant"
  )
  .response(joi.object().required(), "restaurant collection")
  .summary("rate restaurant")
  .description("rate restaurant by user id and count new rating");

router
  .get("/", (req, res) => {
    const { userKey } = req.body;
    const userId = `users/${userKey}`;

    const restaurants = getRestaurants(userId);

    res.send(restaurants);
  })
  .body(
    joi
      .object({
        userKey: joi.string().required(),
      })
      .required(),
    "User id"
  )
  .response(joi.object().required(), "restaurant collections")
  .summary("get restaurants")
  .description("restaurants with user key to get isRated");
