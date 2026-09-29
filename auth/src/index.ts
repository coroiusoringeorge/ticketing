import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { singnoutRouter } from './routes/singnout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

// routes
app.use(currentUserRouter); // current user route
app.use(signinRouter); // signin route
app.use(signupRouter); // signup route
app.use(singnoutRouter); // singnout route

// catch-all: pass into error middleware (throw here can hang the request and surface as 502)
app.all('*', async (_req, _res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler); // error handler

app.listen(3000, () => {
    console.log('Listening on port 3000');
});