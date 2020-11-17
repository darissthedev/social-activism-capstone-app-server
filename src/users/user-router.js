const express = require('express');
const xss = require('xss');
const UserService = require('./user-service');
const { hashPassword } = require('../auth/auth-service');

const userRouter = express.Router();
const jsonParser = express.json();

//filter out the response to avoid showing broken data
const serializeUser = user => ({
  id: user.id,
  full_name: xss(user.full_name),
  email: xss(user.email),
  password: xss(user.password) ,
  account_type: xss(user.account_type),
  organization_name: xss(user.organization_name)
});

userRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {

    //take the input from the user
    const {
      full_name,
      email,
      password,
      account_type,
      organization_name
    } = req.body;
    const newUser = {
      full_name,
      email,
      password,
      account_type,
      organization_name
    };

    //validate the input
    for (const [key, value] of Object.entries(newUser)) {
      if (value == null && key !== 'organization_name') {
        //if there is an error show it
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`
          }
        });
      }
    }

    hashPassword(password).then((hash) => {
      //save the input in the db
      newUser.password = hash;
      UserService.insertUser(
        req.app.get('db'),
        newUser
      )
        .then(user => {
          res
          //display the 201 status code
            .status(201)
          //redirect the request to the original url adding the pancake id for editing
          //   .location(path.posix.join(req.originalUrl, `/${pancake.id}`))
          //return the serialized results
            .json(serializeUser(user));
        })
        .catch(next);
    });

    
  });

module.exports = userRouter;