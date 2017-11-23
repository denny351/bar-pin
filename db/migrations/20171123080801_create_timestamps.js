
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('pins', function(table){
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropTimestamps();
    }),
    knex.schema.table('pins', function(table){
      table.timestamps('pin_ts');
    })
  ])
};
