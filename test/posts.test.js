const knex = require('knex');
const app = require('../src/app');
const { posts, users } = require('./fixtures'); 

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
  });
  it('')


});
