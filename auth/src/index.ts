import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// trust proxy middleware
app.set('trust proxy', true);
// json middleware
app.use(json());
// cookie session middleware
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// routes
app.use(currentUserRouter); // current user route
app.use(signinRouter); // signin route
app.use(signupRouter); // signup route
app.use(signoutRouter); // signout route

// catch-all: pass into error middleware (throw here can hang the request and surface as 502)
app.all('*', async (_req, _res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler); // error handler

const mongoUrl = 'mongodb://auth-mongo-srv:27017/auth';
// start the server
const start = async () => {
  try {
    // check if JWT_KEY is defined
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

start();