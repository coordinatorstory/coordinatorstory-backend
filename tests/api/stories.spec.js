const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/db');

describe('Story routes', () => {
  describe('GET /api/stories', () => {
    it('should respond with 200', async () => {
      let res = await request(server)
        .get('/api/stories')
        .expect(200);
    });

    it('should respond with 404 when request method is not GET', async () => {
      await request(server)
        .post('/api/stories')
        .expect(404);
      await request(server)
        .put('/api/stories')
        .expect(404);
      await request(server)
        .patch('/api/stories')
        .expect(404);
      await request(server)
        .delete('/api/stories')
        .expect(404);
    });

    it('should return all stories', async () => {
      const stories = await db.stories.getAll();
      let res = await request(server).get('/api/stories');
      expect(res.body).toHaveLength(stories.length);
    });

    it('should return stories by country with query param', async () => {
      const { country } = await db.stories.getBy({ id: 34 });
      const countryStories = await db.stories.getCountryStories(country);
      let res = await request(server)
        .get('/api/stories')
        .query({ country });
      expect(res.body).toHaveLength(countryStories.length);
    });
  });
});
