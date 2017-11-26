module.exports = {

  userLoggedIn: function(req, res, next) {
    req.session.user_id ? next() : res.status(401).json("You must be logged in to perform that action!");
  },

  findUserFromName: function(knex, name, callback) {
    // First function findUserFromUserName(knex, callback)
    knex('*')
    .from('users')
    .where({ username: name })
    .then(function(rows) {
      callback(rows)
    });
  },

  addNewUser: function(knex, userInfo, callback) {
    // Callback function addNewUser()
    knex('users')
    .insert({ username: `${userInfo.name}`, password: `${userInfo.pass}` })
    .returning('id')
    .then(function(id) {
      console.log(id[0]);
      callback(id);
    });
  },

  getUserList: function(knex, callback) {
    knex('username')
    .from('users')
    .then(function(rows) {
      callback(rows)
    });
  }
}
