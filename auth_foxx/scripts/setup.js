"use strict";

const db = require("@arangodb").db;

const collections = ["auth_users", "auth_sessions"];

collections.forEach((collectionName) => {
  if (!db._collection(collectionName))
    db._createDocumentCollection(collectionName);
});

const users = module.context.collection("users");

users.ensureIndex({
  unique: true,
  type: "hash",
  fields: ["username"],
});
