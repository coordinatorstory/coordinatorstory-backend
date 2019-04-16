const faker = require('faker');
const bcrypt = require('bcryptjs');

const createUser = () => ({
  username: faker.internet.userName(),
  password: bcrypt.hashSync('password', 12),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  title: faker.name.title()
});

const buildUsers = (count = 10) => {
  const users = [
    {
      username: 'testuser',
      password: bcrypt.hashSync('password', 12),
      first_name: 'Test',
      last_name: 'User',
      email: 'test@mail.com',
      title: 'Tester'
    }
  ];
  for (let i = 0; i < count; i++) {
    users.push(createUser());
  }
  return users;
};

exports.seed = function(knex) {
  return knex('users').insert(buildUsers());
};
