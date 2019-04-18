const {
  getRecordsListBy,
  getRecordBy,
  createRecord,
  updateRecord,
  deleteRecord,
  db
} = require('./db');

const USERS_TABLE = 'users';

module.exports = {
  getAll: getUsers,
  getAllBy: getRecordsListBy(USERS_TABLE),
  getBy: getRecordBy(USERS_TABLE),
  create: createRecord(USERS_TABLE),
  update: updateRecord(USERS_TABLE),
  delete: deleteRecord(USERS_TABLE)
};

async function getUsers() {
  const users = await db(USERS_TABLE).select('id', 'username', 'title');
  return users;
}
