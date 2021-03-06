module.exports = {

  getIdFromPin: function(knex, pinID, callback) {
    knex('pins')
      .where('id', '=', pinID )
      .then((pins) => {
        callback(pins);
      });
  },

  addNewPin: function(knex, pinInfo, callback) {
    knex('pins')
      .insert({
        user_id: `${pinInfo.userID}`,
        title: `${pinInfo.title}`,
        description: `${pinInfo.description}`,
        image: `${pinInfo.image}`,
        lng: `${pinInfo.long}`,
        lat: `${pinInfo.lat}`,
        type: `${pinInfo.type}`
      })
      .then(callback);
  },

  getAllPins: function(knex, callback) {
    knex('*')
    .from('pins')
    .then((rows) => {
      callback(rows);
    });
  },

  getPinsByUserName: function(knex, userName, callback) {
    knex('users')
    .join('pins', 'users.id', '=', 'pins.user_id')
    .select('*')
    .where({ 'users.username': userName}).then((rows) => {
      callback(rows);
    });
  },

  getPinsByUserId: function(knex, userID, callback) {
    knex('pins')
    .where('user_id', userID)
    .then((pins) => {
      callback(pins)
    });
  },

  updatePin: function(knex, updateInfo, callback) {
    knex('pins')
    .where('id', updateInfo.pinID)
    .update({
      title: updateInfo.newTitle,
      description: updateInfo.newDesc,
      image: updateInfo.newImg,
      lng: updateInfo.newLong,
      lat: updateInfo.newLat
    })
    .then(callback);
  },

  deletePin(knex, pinID, callback) {
    knex('pins')
    .where('id', pinID)
    .del()
    .then(callback);
  }
}
