const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/db');

describe('Auth routes', () => {
  const mockUser = {
    username: 'JaneUser',
    password: 'password',
    first_name: 'Jane',
    last_name: 'Jacobs',
    email: 'jjacobs@mail.com',
    title: 'Head Coordinator'
  };

  afterAll(async () => {
    const registeredUser = await db.users.getBy({ username: mockUser.username });
    await db.users.delete(registeredUser.id);
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      let res = await request(server)
        .post('/api/auth/register')
        .send(mockUser);
      expect(res.status).toBe(201);
    });

    it('should respond with 400 when not required fields are absent', async () => {
      let res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'InvalidUser'
        });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should allow a user to log in', async () => {
      let res = await request(server)
        .post('/api/auth/login')
        .send({
          username: mockUser.username,
          password: mockUser.password
        });
      expect(res.status).toBe(200);
    });

    it('should respond with 401 when credentials are invalid', async () => {
      let res = await request(server)
        .post('/api/auth/login')
        .send({
          username: mockUser.username,
          password: 'bad-password'
        });
      expect(res.status).toBe(401);
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'nonexistentUser',
          password: mockUser.password
        });
      expect(res.status).toBe(401);
    });
  });
});
