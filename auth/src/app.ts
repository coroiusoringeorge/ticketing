import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
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
    secure: process.env.NODE_ENV !== 'test',
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

export { app };