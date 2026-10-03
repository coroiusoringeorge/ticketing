import mongoose from 'mongoose';
import { app } from './app';

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