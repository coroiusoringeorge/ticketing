import {scrypt, randomBytes} from 'crypto';
import { promisify } from 'util';

// promisify the scrypt function, so we can use it with async/await
const scryptAsync = promisify(scrypt);


export class Password {
  static async toHash(password: string) {
    // 1. Generate 8 random bytes and convert them to a hex string (16 hex characters)
    const salt = randomBytes(8).toString('hex');
    // 2. Hash the plain text password with the generated salt to create a 64-byte key
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    // 3. Combine the hashed key and salt separated by a dot and return
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    // split the stored password and the salt
    const [hashedPassword, salt] = storedPassword.split('.');
    // hash the supplied password
    const buf = await scryptAsync(suppliedPassword, salt, 64) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}