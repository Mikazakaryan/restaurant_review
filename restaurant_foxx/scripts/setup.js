"use strict";

const db = require("@arangodb").db;

const collections = ["restaurants"];
const edges = ["hasRated"];

collections.forEach((collectionName) => {
  if (!db._collection(collectionName))
    db._createDocumentCollection(collectionName);
});

edges.forEach((edgeName) => {
  if (!db._collection(edgeName)) db._createEdgeCollection(edgeName);
});