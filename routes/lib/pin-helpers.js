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
  }

}
