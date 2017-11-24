
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.timestamps(true, true);
    }),
    knex.schema.createTable('favourites', function(table){
      table.increments();
      table.integer('user_id');
      table.string('pin_id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropTimestamps();
    }),
    knex.schema.dropTable('favourites')
  ])
};
