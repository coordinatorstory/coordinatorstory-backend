const request = require('supertest');
const server = require('../../api/server');

describe('Server', () => {
  describe('Root route', () => {
    it('should respond with 404', async () => {
      let res = await request(server).post('/');
      expect(res.status).toBe(404);
    });
  });
});
