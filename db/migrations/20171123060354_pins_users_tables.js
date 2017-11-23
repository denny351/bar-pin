exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropColumn('type_id');
      table.float('lng');
      table.float('lat');
    }),
    knex.schema.dropTable('types')
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.integer('type_id');
      table.dropColumn('lng');
      table.dropColumn('lat');
    }),
    nex.schema.createTable('types', function(table){
      table.increments();
      table.string('description');
    })
  ])
};
