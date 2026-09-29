import express from 'express';

const router = express.Router();

router.post('/api/users/singnout', (req, res) => {
  res.send('Hi there ! singnout user route');
});

export { router as singnoutRouter };