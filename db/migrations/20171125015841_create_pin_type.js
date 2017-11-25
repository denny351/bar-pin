
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.string('type');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropColumn('type');
    })
  ]);
};
