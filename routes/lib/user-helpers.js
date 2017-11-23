module.exports = {

findUserFromName: function(knex, name, callback) {
  knex('*')
  .from('users')
  .where({ username: name })
  .then(function(rows) {
    callback(rows)
  });
},

addNewUser: function(knex, userInfo, callback) {
  knex('users')
    .insert({ username: `${userInfo.name}`, password: `${userInfo.pass}` }).returning('id').then(function(id) {
      callback(id);
    });
  }


// First function findUserFromUserName(knex, callback)
// Callback function addNewUser()

}
