exports.up = function(knex) {
  return knex.schema.createTable('stories', stories => {
    stories.increments();
    stories.string('title', 255).notNullable();
    stories.string('country', 255).notNullable();
    stories.text('description', 255).notNullable();
    stories.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stories');
};
