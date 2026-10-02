import {scrypt, randomBytes} from 'crypto';
import { promisify } from 'util';

// promisify the scrypt function, so we can use it with async/await
const scryptAsync = promisify(scrypt);


export class Password {
  /**
   * Hashes a password, using a salt.
   */
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    // return the hashed password and the salt
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