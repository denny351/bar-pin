module.exports = {

  addNewPin(knex, pinInfo, callback) {
    knex('pins')
      .insert({
        user_id: `${pinInfo.userID}`,
        title: `${pinInfo.title}`,
        description: `${pinInfo.description}`,
        image: `${pinInfo.image}`,
        lng: `${pinInfo.long}`,
        lat: `${pinInfo.lat}`,
      })
      .then(callback());
  },

  getAllPins(knex, callback) {
    knex('*')
    .from('pins')
    .then((rows) => {
      callback(rows);
    });
  },

  getPinsByUserId(knex, userID, callback) {
    knex('*')
    .from('pins')
    .where({ user_id: userID })
    .then((rows) => {
      callback(rows);
    });
  },

  updatePin(knex, updateInfo, callback) {
    knex('pins')
    .where('id', updateInfo.pinID)
    .update({
      title: updateInfo.newTitle,
      description: updateInfo.newDesc,
      image: updateInfo.newImg,
      lng: updateInfo.newLong,
      lat: updateInfo.newLat
    })
    .then(
      callback()
    );
  },

  deletePin(knex, pinID, callback) {
    knex('pins')
    .where('id', pinID)
    .del()
    .then(
      callback()
    );
  }
}
