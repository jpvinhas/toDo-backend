const config = require('../knexfile.js');
const knex = require('knex');
const db = knex(config);

module.exports = db;