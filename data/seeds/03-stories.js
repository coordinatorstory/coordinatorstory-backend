const faker = require('faker');

const countries = [
  'Bolivia',
  'Brazil',
  'Cambodia',
  'Colombia',
  'Ecuador',
  'El Salvador',
  'Ghana',
  'Guatemala',
  'Haiti',
  'Honduras',
  'Kiribati',
  'Madagascar',
  'Mongolia',
  'Nicaragua',
  'Paraguay',
  'Peru',
  'Philippines',
  'Sierra Leone',
  'Zimbabwe'
];

const createStory = () => ({
  title: `${faker.name.firstName()}'s story`,
  country: faker.random.arrayElement(countries),
  description: faker.lorem.sentences(4)
});

const buildStories = (count = 150) =>
  Array(count)
    .fill(null)
    .map(i => createStory());

exports.seed = function(knex) {
  return knex('stories').insert(buildStories());
};
