const request = require('supertest');
const faker = require('faker');
const server = require('../../api/server');
const db = require('../../data/db');

describe('User routes', () => {
  const userId = 5;
  let userToken;
  const mockStory = {
    title: `${faker.name.firstName()}'s story`,
    country: 'Ecuador',
    description: faker.lorem.sentences(4),
    user_id: userId
  };

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

  describe('GET /api/user/stories', () => {
    describe('when not logged in', () => {
      it('should respond with 401', async () => {
        let res = await request(server)
          .get('/api/user/stories')
          .expect(401);
      });
    });

    describe('when logged in', () => {
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

  describe('POST /api/user/stories', () => {
    describe('when not logged in', () => {
      it('should respond with 401', async () => {
        let res = await request(server)
          .post('/api/user/stories')
          .expect(401);
      });
    });

    describe('when logged in', () => {
      let createdStoryId;

      afterAll(async () => {
        await db.stories.delete(createdStoryId);
      });

      it('should create a story', async () => {
        const userStories = await db.stories.getUserStories(userId);

        let res = await request(server)
          .post('/api/user/stories')
          .set('Authorization', userToken)
          .send(mockStory)
          .expect(201);

        expect(res.body).toEqual(
          expect.objectContaining({
            title: mockStory.title,
            country: mockStory.country,
            description: mockStory.description,
            user_id: mockStory.user_id,
            created_at: expect.any(String),
            updated_at: expect.any(String),
            id: expect.any(Number)
          })
        );

        createdStoryId = res.body.id;

        const userStoriesUpdated = await db.stories.getUserStories(userId);
        expect(userStoriesUpdated).toHaveLength(userStories.length + 1);
      });

      it('should should validate a new story', async () => {
        let res = await request(server)
          .post('/api/user/stories')
          .set('Authorization', userToken)
          .send({
            title: 'Story with invalid data'
          })
          .expect(400);
      });
    });
  });

  describe('GET /api/user/stories/:id', () => {
    describe('when not logged in', () => {
      it('should respond with 401', async () => {
        let res = await request(server)
          .get('/api/user/stories/5')
          .expect(401);
      });
    });

    describe('when logged in', () => {
      it('should get a story that belongs to a user', async () => {
        const userStories = await db.stories.getUserStories(userId);
        const storyId = userStories[0].id;
        let res = await request(server)
          .get(`/api/user/stories/${storyId}`)
          .set('Authorization', userToken)
          .expect(200);
      });

      it('should not get a story that does not belong to a user', async () => {
        const allStories = await db.stories.getAll();
        const storyId = allStories.filter(s => s.id !== userId)[0].id;
        let res = await request(server)
          .get(`/api/user/stories/${storyId}`)
          .set('Authorization', userToken)
          .expect(404);
      });

      it('should not get a story that does not exist', async () => {
        let res = await request(server)
          .get(`/api/user/stories/123456789`)
          .set('Authorization', userToken)
          .expect(404);
      });
    });
  });

  describe('DELETE /api/user/stories/:id', () => {
    describe('when not logged in', () => {
      it('should respond with 401', async () => {
        let res = await request(server)
          .delete('/api/user/stories/5')
          .expect(401);
      });
    });

    describe('when logged in', () => {
      it('should delete a story that belongs to a user', async () => {
        const userStories = await db.stories.getUserStories(userId);

        let res1 = await request(server)
          .post('/api/user/stories')
          .set('Authorization', userToken)
          .send(mockStory)
          .expect(201);

        const storyId = res1.body.id;

        let res2 = await request(server)
          .delete(`/api/user/stories/${storyId}`)
          .set('Authorization', userToken)
          .expect(204);

        const userStoriesAfterDelete = await db.stories.getUserStories(userId);
        expect(userStoriesAfterDelete).toHaveLength(userStories.length);
      });

      it('should not delete a story that does not belong to a user', async () => {
        const allStories = await db.stories.getAll();
        const storyId = allStories.filter(s => s.id !== userId)[0].id;
        let res = await request(server)
          .delete(`/api/user/stories/${storyId}`)
          .set('Authorization', userToken)
          .expect(404);
      });

      it('should not delete a story that does not exist', async () => {
        let res = await request(server)
          .delete(`/api/user/stories/123456789`)
          .set('Authorization', userToken)
          .expect(404);
      });
    });
  });
});
