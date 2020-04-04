"use strict";

const db = require("@arangodb").db;

const collections = ["users"];

collections.forEach((collectionName) => {
  if (!db._collection(collectionName))
    db._createDocumentCollection(collectionName);
});
