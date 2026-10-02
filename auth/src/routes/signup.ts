import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/users';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    // validate the request body
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ], async (req: Request, res: Response) => {
    // validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    // check if the email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // create a user
    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
});

export { router as signupRouter };
