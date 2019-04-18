const {
  getAllRecords,
  getAllRecordsBy,
  getRecordBy,
  createRecord,
  deleteRecord,
  db
} = require('./db');

const STORIES_TABLE = 'stories';

module.exports = {
  getAll: getAllRecords(STORIES_TABLE),
  getUserStories,
  getCountryStories,
  getAllBy: getAllRecordsBy(STORIES_TABLE),
  getBy: getRecordBy(STORIES_TABLE),
  create: createRecord(STORIES_TABLE),
  update: updateStory,
  delete: deleteRecord(STORIES_TABLE)
};

async function getUserStories(id) {
  if (!id) throw new DatabaseError('Story ID required to get user stories');

  return db(STORIES_TABLE).where({ user_id: id });
}

async function getCountryStories(country) {
  if (!country) throw new DatabaseError('Country required to get stories by country');

  return db(STORIES_TABLE).whereRaw(`lower(country) like '%' || ? || '%'`, country.toLowerCase());
}

async function updateStory(userId, storyId, storyUpdates) {
  if (!userId || !storyId || !storyUpdates)
    throw new DatabaseError('User ID, Story ID, and story object required to update a story');

  const updatedCount = await db(STORIES_TABLE)
    .where({ id: storyId, user_id: userId })
    .update(storyUpdates);
  return updatedCount;
}
