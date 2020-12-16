require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {
  NODE_ENV
} = require('./config');
const errorHandler = require('./middleware/error-handler');
// const pancakeRouter = require('./pancake/pancake-router');
const userRouter = require('./users/user-router');
const authRouter = require('./auth/auth-router');
const postRouter = require('./posts/posts-router');


const app = express();

const morganOption = (NODE_ENV === 'production') ?
  'tiny' :
  'common';

app.use(morgan(morganOption, {
  skip: () => NODE_ENV === 'test',
}));
app.use(cors());
app.use(helmet());

app.use(express.static('public'));

app.use('/api/auth', authRouter);

// app.use('/api/pancakes', pancakeRouter);
app.use('/api/users', userRouter);
app.use('/api/post', postRouter);
app.use(errorHandler);

module.exports = app;
