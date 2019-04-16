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
    user_id: faker.random.number({ min: 1, max: 10 })
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

      it('should create a story for a user', async () => {
        const userStories = await db.stories.getUserStories(userId);

        let res = await request(server)
          .post('/api/user/stories')
          .set('Authorization', userToken)
          .send(mockStory)
          .expect(201);

        expect(res.body).toEqual(
          expect.objectContaining({
            title: expect.toEqual(mockStory.title),
            country: expect.toEqual(mockStory.country),
            description: expect.toEqual(mockStory.description),
            user_id: expect.toEqual(mockStory.user_id)
          })
        );

        createdStoryId = res.body.id;
        console.log(createdStoryId);

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
});
