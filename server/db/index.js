const db = require('./db');
const User = require('./User');


// If we were to create any associations between different tables
// this would be a good place to do that:

module.exports = {
 db,
  models: {
    User
  }
};
