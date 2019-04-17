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
    description: faker.lorem.sentences(4)
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
            user_id: userId,
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

        let res = await request(server)
          .post('/api/user/stories')
          .set('Authorization', userToken)
          .send(mockStory)
          .expect(201);

        const storyId = res.body.id;

        await request(server)
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

  describe('PUT /api/user/stories/:id', () => {
    describe('when not logged in', () => {
      it('should respond with 401', async () => {
        let res = await request(server)
          .put('/api/user/stories/5')
          .expect(401);
      });
    });

    describe('when logged in', () => {
      it('should update a story that belongs to a user', async () => {
        const userStories = await db.stories.getUserStories(userId);
        const story = userStories[0];
        await request(server)
          .put(`/api/user/stories/${story.id}`)
          .set('Authorization', userToken)
          .send({
            title: story.title,
            country: story.country,
            description: story.description
          })
          .expect(204);
      });

      it('should should validate a story to be updated', async () => {
        const userStories = await db.stories.getUserStories(userId);
        const storyId = userStories[0].id;
        await request(server)
          .put(`/api/user/stories/${storyId}`)
          .set('Authorization', userToken)
          .send({
            title: 'Story with invalid data'
          })
          .expect(400);
      });

      it('should not update a story that does not belong to a user', async () => {
        const allStories = await db.stories.getAll();
        const story = allStories.filter(s => s.id !== userId)[0];
        await request(server)
          .put(`/api/user/stories/${story.id}`)
          .set('Authorization', userToken)
          .send({
            title: story.title,
            country: story.country,
            description: story.description
          })
          .expect(404);
      });

      it('should not update a story that does not exist', async () => {});
    });
  });
});
