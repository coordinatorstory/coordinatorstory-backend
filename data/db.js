const knex = require('knex');
const config = require('../knexfile.js');
const { DatabaseError } = require('../common/errors');

const dbEnv = process.env.DB_ENV || 'testing';

const db = knex(config[dbEnv]);

module.exports = {
  db,
  getRecordsList,
  getRecordsListBy,
  getRecordBy,
  createRecord,
  updateRecord,
  deleteRecord
};

function getRecordsList(tableName) {
  return async function() {
    const records = await db(tableName);
    return records;
  };
}

function getRecordsListBy(tableName) {
  return async function(filter) {
    if (!filter) throw new DatabaseError('Filter required to get records by filter');

    const records = await db(tableName).where(filter);
    return records;
  };
}

function getRecordBy(tableName) {
  return async function(filter) {
    if (!filter) throw new DatabaseError('Filter required to get records by filter');

    const record = await db(tableName)
      .where(filter)
      .first();
    return record;
  };
}

function createRecord(tableName) {
  return async function(record) {
    if (!record) throw new DatabaseError('New record object required to create a record');

    const [newRecordId] = await db(tableName)
      .insert(record)
      .returning('id');
    const newRecord = await db(tableName)
      .where({ id: newRecordId })
      .first();
    return newRecord;
  };
}

function updateRecord(tableName) {
  return async function(id, record) {
    if (!id || !record)
      throw new DatabaseError('Record ID and record object required to update a record');

    const updatedCount = await db(tableName)
      .where({ id })
      .update(record);
    return updatedCount;
  };
}

function deleteRecord(tableName) {
  return async function(id) {
    if (!id) throw new DatabaseError('Record ID required to delete a record');

    const deletedCount = await db(tableName)
      .where({ id })
      .del();
    return deletedCount;
  };
}
