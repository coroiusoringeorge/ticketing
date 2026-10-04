import request from 'supertest';
import { app } from '../../app';


it('returns a 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'testtest.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  // create a user
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  // try to sign in the new user with the wrong password
  await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'p',
      })
      .expect(400);
});

it('responsd with a cookie when given valid credentials', async () => {
  // create a user
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  // try to sign in the new user with the correct credentials
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com', 
      password: 'password',
    })
    .expect(200);
  // check if the response has a cookie
  expect(response.get('Set-Cookie')).toBeDefined();
});