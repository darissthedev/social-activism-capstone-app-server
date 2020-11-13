const bcrypt = require('bcryptjs')

function makeUsersArray() {
  return [
    {
      id: 1,
      full_name: 'Test user 1',
      email: 'test@test.com',
      account_type: 'personal',
      password: 'password123',
      organization_name: 'ABC'
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
        users
        RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
       const preppedUsers = users.map(user => ({
         ...user,
         password: bcrypt.hashSync(user.password, 1)
       }))
       return db.into('users').insert(preppedUsers)
         .then(() =>
           // update the auto sequence to stay in sync
           db.raw(
             `SELECT setval('users_id_seq', ?)`,
             [users[users.length - 1].id],
           )
         )
     }

module.exports = {
  makeUsersArray,
  cleanTables, 
  seedUsers
};