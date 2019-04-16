const faker = require('faker');

const createRecipe = () => ({
  name: `${faker.name.firstName()}'s ${faker.lorem.words(2)}`,
  method: faker.lorem.sentences(4),
  dish_id: faker.random.number({
    min: 1,
    max: 11
  })
});

const buildRecipes = (count = 50) =>
  Array(count)
    .fill(null)
    .map(i => createRecipe());

exports.seed = function(knex) {
  return knex('recipes').insert(buildRecipes());
};
