const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
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
  });

  before('cleanup', () => db.raw('TRUNCATE TABLE comments, posts, users RESTART IDENTITY;'));

  afterEach('cleanup', () => db.raw('TRUNCATE TABLE comments, posts, users RESTART IDENTITY;'));

  after('disconnect from the database', () => db.destroy());

  describe('POST create a user',function() {

    it('should create a new user in the database when input data is valid', function() {
      const newUser = {
        'id': 1,
        'full_name': 'bobby jackson',
        'email': 'test@test.com',
        'password': 'password123',
        'account_type': 'personal'
      };          

      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body.id).to.equal(newUser.id);
          expect(res.body.full_name).to.equal(newUser.full_name);
          expect(res.body.email).to.equal(newUser.email);
          expect(res.body.account_type).to.equal(newUser.account_type);
        });
    });



  });









});