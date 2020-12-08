const knex = require('knex');
const app = require('../src/app');
const { users } = require('./fixtures'); 

describe('User API:', function() {
    let db;
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      });
      app.set('db', db);
    })