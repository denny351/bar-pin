module.exports = {
	addFavoritePin(knex, favInfo, callback) {
		knex("favourites")
			.insert({
        user_id: `${favInfo.userID}`,
        pin_id: `${favInfo.pinID}`
      })
      .then(callback());
	},

  deleteFavoritePin(knex, favInfo, callback) {
    knex("favourites") // need favID
      .where({
        pin_id: `${favInfo.pinID}`,
        user_id: `${favInfo.userID}`
        })
      .del()
      .then(callback());
  },

	findFavPin(knex, favInfo, callback) {
    knex("favourites")
    .where("user_id", favInfo.userID)
    .then((rows) => {
        callback(rows)
      })
  },

  getUserFavsById(knex, userID, callback) {
    knex('pins')
      .join('favourites', 'pins.id', '=', 'favourites.pin_id')
      .join('users', 'users.id', '=', 'favourites.user_id')
      .select('*')
      .from('pins')
      .where({ 'users.id': userID}).then((rows) => {
        callback(rows);
      });
  }
}
