
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments();
      table.string('username');
      table.string('password');
    }),
    knex.schema.createTable('pins', function(table){
      table.increments();
      table.integer('user_id');
      table.integer('type_id')
      table.string('title');
      table.string('description');
      table.string('image');
      table.timestamps('pin_ts');
    }),
    knex.schema.createTable('types', function(table){
      table.increments();
      table.string('description');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pins'),
    knex.schema.dropTable('types')
  ]);
};
