"use strict";

const db = require("@arangodb").db;

const collections = ["auth_users", "auth_sessions"];

collections.forEach((collectionName) => {
  if (!db._collection(collectionName))
    db._createDocumentCollection(collectionName);
});
