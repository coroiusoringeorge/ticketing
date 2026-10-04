import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {

  // sign up a user
  const cookie = await global.signin();

  // get the current user
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  // check if the response has a cookie
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
  // check if the response has a null currentUser
  expect(response.body.currentUser).toEqual(null);
});