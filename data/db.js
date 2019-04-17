const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'testing';

const db = knex(config[dbEnv]);

const usersTable = 'users';
const storiesTable = 'stories';

// general

const getAllRecords = tableName => async () => {
  const records = await db(tableName);
  return records;
};

const getAllRecordsBy = tableName => async filter => {
  // TODO throw error if no filter
  const records = await db(tableName).where(filter);
  return records;
};

const getRecordBy = tableName => async filter => {
  // TODO throw error if no filter
  const record = await db(tableName)
    .where(filter)
    .first();
  return record;
};

const createRecord = tableName => async record => {
  const [newRecordId] = await db(tableName)
    .insert(record)
    .returning('id');
  const newRecord = await db(tableName)
    .where({ id: newRecordId })
    .first();
  return newRecord;
};

const updateRecord = tableName => async (id, record) => {
  const updatedCount = await db(tableName)
    .where({ id })
    .update(record);
  return updatedCount;
};

const deleteRecord = tableName => async id => {
  const deletedCount = await db(tableName)
    .where({ id })
    .del();
  return deletedCount;
};

// users

const getUsers = async () => {
  const users = await db(usersTable).select('id', 'username', 'title');
  return users;
};

// stories

const getAllStories = async () => {
  return db(storiesTable).select('id', 'title', 'country', 'description');
};

const getUserStories = async id => {
  return db(storiesTable).where({ user_id: id });
};

const getCountryStories = async country => {
  return db(storiesTable).whereRaw(`lower(country) like '%' || ? || '%'`, country.toLowerCase());
};

const updateStory = async (userId, storyId, storyUpdates) => {
  const updatedCount = await db(storiesTable)
    .where({ id: storyId, user_id: userId })
    .update(storyUpdates);
  return updatedCount;
};

module.exports = {
  knex,
  users: {
    getAll: getUsers,
    getAllBy: getAllRecordsBy(usersTable),
    getBy: getRecordBy(usersTable),
    create: createRecord(usersTable),
    update: updateRecord(usersTable),
    delete: deleteRecord(usersTable)
  },
  stories: {
    getAll: getAllStories,
    getUserStories,
    getCountryStories,
    getAllBy: getAllRecordsBy(storiesTable),
    getBy: getRecordBy(storiesTable),
    create: createRecord(storiesTable),
    update: updateStory,
    delete: deleteRecord(storiesTable)
  }
};
