import express from 'express';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// get the current user, using the currentUser middleware and requireAuth middleware
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
