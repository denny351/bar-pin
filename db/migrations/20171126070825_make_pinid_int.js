
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('favourites', function(table){
      table.dropColumn('pin_id');
    }),
    knex.schema.table('favourites', function(table){
      table.integer('pin_id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('favourites', function(table){
      table.dropColumn('pin_id');
    }),
    knex.schema.table('favourites', function(table){
      table.string('pin_id');
    })
  ]);
};
