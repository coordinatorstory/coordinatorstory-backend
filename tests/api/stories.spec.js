const request = require('supertest');
const server = require('../../api/server');
const storiesData = require('../../data/stories');

describe('Story routes', () => {
  describe('GET /api/stories', () => {
    it('should respond with 200', async () => {
      let res = await request(server)
        .get('/api/stories')
        .expect('Content-Type', /json/)
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
      const stories = await storiesData.getAll();
      let res = await request(server)
        .get('/api/stories')
        .expect(200)
        .expect('Content-Type', /json/);
      expect(res.body).toHaveLength(stories.length);
    });

    it('should return stories by country with query param', async () => {
      const { country } = await storiesData.getBy({ id: 34 });
      const countryStories = await storiesData.getCountryStories(country);
      let res = await request(server)
        .get('/api/stories')
        .query({ country })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(res.body).toHaveLength(countryStories.length);
    });
  });

  describe('GET /api/stories/:id', () => {
    it('should get a story', async () => {
      let res = await request(server)
        .get('/api/stories/5')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should not get a story that does not exist', async () => {
      let res = await request(server)
        .get(`/api/stories/123456789`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
});
