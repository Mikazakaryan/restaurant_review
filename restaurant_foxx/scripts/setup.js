"use strict";

const db = require("@arangodb").db;

const collections = [
  "rates",
  "replies",
  "auth_users",
  "restaurants",
  "auth_sessions",
];
const edges = ["hasRated", "isOwn", "belongsTo", "hasReplied", "repliedFor"];

collections.forEach((collectionName) => {
  if (!db._collection(collectionName))
    db._createDocumentCollection(collectionName);
});

edges.forEach((edgeName) => {
  if (!db._collection(edgeName)) db._createEdgeCollection(edgeName);
});
