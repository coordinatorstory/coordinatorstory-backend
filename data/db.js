const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'testing';

const db = knex(config[dbEnv]);

const usersTable = 'users';

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
  const [newRecordId] = await db(tableName).insert(record);
  const newRecord = await db(tableName).where({ id: newRecordId });
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
  const users = await db(usersTable).select('id', 'username', 'department');
  return users;
};

module.exports = {
  db,
  users: {
    getAll: getUsers,
    getAllBy: getAllRecordsBy(usersTable),
    getBy: getRecordBy(usersTable),
    create: createRecord(usersTable),
    update: updateRecord(usersTable),
    delete: deleteRecord(usersTable)
  },
  stories: {}
};