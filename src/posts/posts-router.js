const express = require('express');
const xss = require('xss');
const PostService = require('./post-service');
const { hashPassword } = require('../auth/auth-service');

const postRouter = express.Router();
const jsonParser = express.json();

//filter out the response to avoid showing broken data
const serializePost = post => ({
  id: post.id,
  users_id: post.users_id,
  event_title: xss(post.event_title),
  event_description: xss(post.event_description),
  event_type: xss(post.event_type),
  event_date: post.event_date,
  event_location: xss(post.event_location)
});

postRouter
  .route('/')
  //relevant
  .get((req, res, next) => {

    //connect to the service to get the data
    PostService.getPosts(req.app.get('db'))
      .then(post => {
        //map the results to get each one of the objects and serialize them
        res.json(post.map(serializePost));
      })
      .catch(next);
  })
    //relevant
  .post(jsonParser, (req, res, next) => {

    //take the input from the user
    const {
      event_title,
      event_date,
      event_description,
      event_location,
      event_type
    } = req.body;
    const newPancake = {
      event_title,
      event_date,
      event_description,
      event_location,
      event_type
    };

    //validate the input
    for (const [key, value] of Object.entries(newPost)) {
      if (value == null) {
        //if there is an error show it
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`
          }
        });
      }
    }

    //save the input in the db
    PostService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
        //display the 201 status code
          .status(201)
        //redirect the request to the original url adding the post id for editing
          .location(path.posix.join(req.originalUrl, `/${post.id}`))
        //return the serialized results
          .json(serializePost(post));
      })
      .catch(next);
  });

    //connect to the service to get the data
    PostService.getPostById(
      req.app.get('db'),
      req.params.post_id
    )
      .then(post => {
        if (!post) {
          //if there is an error show it
          return res.status(404).json({
            error: {
              message: 'Post doesn\'t exist'
            }
          });
        }
        res.post = post;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {

    //get each one of the objects from the results and serialize them
    res.json(serializePost(res.post));
  })

  //relevant
  .patch(jsonParser, (req, res, next) => {

    //take the input from the user
    const {
      event_title,
      event_date,
      event_description,
      event_location,
      event_type
    } = req.body;

    const postToUpdate = {
      event_title,
      event_date,
      event_description,
      event_location,
      event_type
    };

    //validate the input by checking the length of the postToUpdate object to make sure that we have all the values
    const numberOfValues = Object.values(postToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      //if there is an error show it
      return res.status(400).json({
        error: {
          message: 'Request body must content either \'title\' or \'completed\''
        }
      });
    }

    //save the input in the db
    PostService.updatePost(
      req.app.get('db'),
      req.params.post_id,
      postToUpdate
    )
      .then(updatedPost => {

        //get each one of the objects from the results and serialize them
        res.status(200).json(serializePost(updatedPost));
      })
      .catch(next);
  })
  //relevant
  .delete((req, res, next) => {
    PostService.deletePost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(numRowsAffected => {

        //check how many rows are effected to figure out if the delete was successful
        res.status(204).json(numRowsAffected).end();
      })
      .catch(next);
  });

module.exports = postRouter;