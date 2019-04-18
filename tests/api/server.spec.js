const request = require('supertest');
const server = require('../../api/server');

describe('Server', () => {
  describe('Root route', () => {
    it('should respond with 404', async () => {
      await request(server)
        .get('/')
        .expect(404);
    });
  });
});
