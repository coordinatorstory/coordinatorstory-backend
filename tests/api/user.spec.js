const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/db');

describe('User routes', () => {
  describe('GET /api/user/stories', () => {
    describe('when not logged in', () => {
      it('should respond with 401', async () => {
        let res = await request(server)
          .get('/api/user/stories')
          .expect(401);
      });
    });

    describe('when logged in', () => {
      const userId = 5;
      let userToken;

      beforeAll(async () => {
        const user = await db.users.getBy({ id: userId });
        const res = await request(server)
          .post('/api/auth/login')
          .send({
            username: user.username,
            password: 'password'
          });
        userToken = res.body.token;
      });

      it("should respond with a user's stories", async () => {
        const userStories = await db.stories.getUserStories(userId);
        let res = await request(server)
          .get('/api/user/stories')
          .set('Authorization', userToken)
          .expect(200);
        expect(res.body).toHaveLength(userStories.length);
      });
    });
  });
});
