import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email:string;
};

// declare the currentUser property on the Request interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// middleware to get the current user
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if the user is authenticated
  if (!req.session?.jwt) {
    return next();
  }

  // verify the token
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;

    next();
  } catch (err) {}

  next();
};
