//const { VIRTUAL } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('payers', {
  // Adding  Sequelize fields here

  payer: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  points: {
    type: Sequelize.INTEGER,
  },
  timestamp: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    }
  },
})

module.exports = User;