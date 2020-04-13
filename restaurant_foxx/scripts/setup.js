"use strict";

const db = require("@arangodb").db;

const edges = ["is_own"];
const collections = ["restaurants"];

collections.forEach((collectionName) => {
  if (!db._collection(collectionName))
    db._createDocumentCollection(collectionName);
});

edges.forEach((edgeName) => {
  if (!db._collection(edgeName)) db._createEdgeCollection(edgeName);
});

edges.forEach((edgeName) =>
  db._collection(edgeName).ensureIndex({
    unique: true,
    type: "hash",
    fields: ["_from", "_to"],
  })
);
