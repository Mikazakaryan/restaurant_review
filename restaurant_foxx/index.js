"use strict";

const joi = require("joi");
const query = require("@arangodb").query;
const createRouter = require("@arangodb/foxx/router");

const router = createRouter();

module.context.use(router);

router
  .post("/rate", (req, res) => {
    const { userKey, restaurantKey, date, rating, comment } = req.body;

    const userId = `users/${userKey}`;
    const restaurantId = `restaurants/${restaurantKey}`;

    query`
      INSERT { 
        date: ${date},
        _from: ${userId},
        rating: ${rating},
        comment: ${comment},
        _to: ${restaurantId}
       } INTO hasRated
    `;

    const restaurants = query`    
      FOR restaurant IN restaurants
        RETURN merge(restaurant, {
          isRated: HAS(
            FIRST(
              FOR vote, edge IN 1..1 INBOUND restaurant hasRated
              FILTER edge._from == ${userId}  
              RETURN edge   
            ), 
          '_id'),
          rating: FIRST(
            FOR user, vote IN 1..1 INBOUND restaurant hasRated
              COLLECT rating = vote.rating
              RETURN rating
          )
        })
    `.toArray();

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

    const restaurants = query`  
      FOR restaurant IN restaurants
        RETURN merge(restaurant, {
          isRated: HAS(
            FIRST(
              FOR vote, edge IN 1..1 INBOUND restaurant hasRated
              FILTER edge._from == ${userId}  
              RETURN edge   
            ), 
          '_id'),
          rating: FIRST(
            FOR user, vote IN 1..1 INBOUND restaurant hasRated
              COLLECT rating = vote.rating
              RETURN rating
          )
        })
    `.toArray();

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
