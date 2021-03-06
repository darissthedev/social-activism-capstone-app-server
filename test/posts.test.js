const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { posts, users } = require('./fixtures'); 
// const JWT = require('jsonwebtoken');
const AuthService = require('../src/auth/auth-service');

describe('Posts API:', function() {
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

  describe('Posts', () => {
    beforeEach('seed users and posts', () => {
      return db('users').insert(users)
        .then(() => db('posts').insert(posts));
    }); 
    it('should respond to GET `/api/post` with an array of posts and status 200', function() {
      return supertest(app)
        .get('/api/post')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(posts.length);
          res.body.forEach((item) => {
            expect(item).to.be.a('object');
            expect(item).to.include.keys('id', 'users_id', 'event_title', 'event_description', 'event_type', 'event_date', 'event_location');
          });
        });
    });
    it('should create a new post only for an authorized user', function() {

      const authToken = AuthService.createJwt(users[1].email, {});
      
      const newPost = {
        // 'id': 1,
        'users_id': 1,
        'event_title': 'The Block',
        'event_description': 'we will rally outside city hall',
        'event_type': 'sit in',
        'event_date': '2017-03-26 10:10:10-05:00',
        'event_location': 'city hall'
      }; 

      return supertest(app)
        .post('/api/post')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newPost)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body.users_id).to.equal(2);
          expect(res.body.event_title).to.equal(newPost.event_title);
          expect(res.body.event_description).to.equal(newPost.event_description);
          expect(res.body.event_type).to.equal(newPost.event_type);
          expect(res.body.event_location).to.equal(newPost.event_location);
        }); 
    });


    it('should respond to GET `/api/post/id` with a post and status 200', function() {
      return supertest(app)
        .get('/api/post/${1}')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('id', 'user_id', 'event_title');
        });
    });

    it('should delete a post', function() {
      return supertest(app)
        .delete(`/api/post/${1}`)
        .expect(204);
    });

    it('should update (PATCH) a post', function() {
      const item = {
        'event_title': 'American Pancakes'
      };
      return supertest(app)
        .patch(`/api/post/${1}`)
        .send(item)
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'event_title');
          expect(res.body.title).to.equal(item.event_title);
          expect(res.body.completed).to.be.false;
        });
    });
  }); 
});
