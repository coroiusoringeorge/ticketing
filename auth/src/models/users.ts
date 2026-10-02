import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the methods that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// mongoose schema for a User document
const userSchema = new mongoose.Schema({
  email: {
    type: String, // mongoose type
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// pre-save hook to hash the password before saving the user
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
});

// A static method to build a User document
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// A mongoose model for a User document, this will return a UserModel
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };