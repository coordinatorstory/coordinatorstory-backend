const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/db');

describe('Story routes', () => {
  describe('GET /api/stories', () => {
    it('should respond with 200', async () => {
      let res = await request(server).get('/api/stories');
      expect(res.status).toBe(200);
    });

    it('should return all stories when not logged in', async () => {
      const stories = await db.stories.getAll();
      let res = await request(server).get('/api/stories');
      expect(res.body).toHaveLength(stories.length);
    });
  });
});
