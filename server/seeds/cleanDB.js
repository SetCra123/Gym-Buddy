const models = require('../models');


// module.exports = async (modelName, collectionName) => {
//   try {
//     let modelExists = await models[modelName].db.connection.db.listCollections({
//       name: collectionName
//     }).toArray()

//     if (modelExists.length) {
//       await db.dropCollection(collectionName);
//     }
//   } catch (err) {
//     throw err;
//   }
// }

const mongoose = require('mongoose');
const db = require('../config/connection'); // now gets the actual connection

const cleanDB = async (collectionName) => {
  try {
    const collections = await db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      console.log(`Dropping collection: ${collectionName}`);
      await db.db.dropCollection(collectionName);
    } else {
      console.log(`No collection named ${collectionName} found.`);
    }
  } catch (err) {
    console.error(`❌ Error dropping ${collectionName}:`, err);
  }
};

module.exports = cleanDB;
