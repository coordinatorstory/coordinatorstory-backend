const knex = require('knex');
const config = require('../knexfile.js');
const { DatabaseError } = require('../common/errors');

const dbEnv = process.env.DB_ENV || 'testing';

const db = knex(config[dbEnv]);

const USERS_TABLE = 'users';
const STORIES_TABLE = 'stories';

// general

const getAllRecords = tableName => async () => {
  const records = await db(tableName);
  return records;
};

const getAllRecordsBy = tableName => async filter => {
  if (!filter) throw new DatabaseError('Filter required to get records by filter');

  const records = await db(tableName).where(filter);
  return records;
};

const getRecordBy = tableName => async filter => {
  if (!filter) throw new DatabaseError('Filter required to get records by filter');

  const record = await db(tableName)
    .where(filter)
    .first();
  return record;
};

const createRecord = tableName => async record => {
  if (!record) throw new DatabaseError('New record object required to create a record');

  const [newRecordId] = await db(tableName)
    .insert(record)
    .returning('id');
  const newRecord = await db(tableName)
    .where({ id: newRecordId })
    .first();
  return newRecord;
};

const updateRecord = tableName => async (id, record) => {
  if (!id || !record)
    throw new DatabaseError('Record ID and record object required to update a record');

  const updatedCount = await db(tableName)
    .where({ id })
    .update(record);
  return updatedCount;
};

const deleteRecord = tableName => async id => {
  if (!id) throw new DatabaseError('Record ID required to delete a record');

  const deletedCount = await db(tableName)
    .where({ id })
    .del();
  return deletedCount;
};

// users

const getUsers = async () => {
  const users = await db(USERS_TABLE).select('id', 'username', 'title');
  return users;
};

// stories

const getUserStories = async id => {
  if (!id) throw new DatabaseError('Story ID required to get user stories');

  return db(STORIES_TABLE).where({ user_id: id });
};

const getCountryStories = async country => {
  if (!country) throw new DatabaseError('Country required to get stories by country');

  return db(STORIES_TABLE).whereRaw(`lower(country) like '%' || ? || '%'`, country.toLowerCase());
};

const updateStory = async (userId, storyId, storyUpdates) => {
  if (!userId || !storyId || !storyUpdates)
    throw new DatabaseError('User ID, Story ID, and story object required to update a story');

  const updatedCount = await db(STORIES_TABLE)
    .where({ id: storyId, user_id: userId })
    .update(storyUpdates);
  return updatedCount;
};

module.exports = {
  knex,
  users: {
    getAll: getUsers,
    getAllBy: getAllRecordsBy(USERS_TABLE),
    getBy: getRecordBy(USERS_TABLE),
    create: createRecord(USERS_TABLE),
    update: updateRecord(USERS_TABLE),
    delete: deleteRecord(USERS_TABLE)
  },
  stories: {
    getAll: getAllRecords(STORIES_TABLE),
    getUserStories,
    getCountryStories,
    getAllBy: getAllRecordsBy(STORIES_TABLE),
    getBy: getRecordBy(STORIES_TABLE),
    create: createRecord(STORIES_TABLE),
    update: updateStory,
    delete: deleteRecord(STORIES_TABLE)
  }
};
