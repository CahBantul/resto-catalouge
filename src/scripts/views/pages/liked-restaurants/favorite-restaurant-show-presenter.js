class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoritesRestaurants = favoriteRestaurants;

    this._showFavoritesRestaurants();
  }

  async _showFavoritesRestaurants() {
    const restaurants = await this._favoritesRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }
}

export default FavoriteRestaurantShowPresenter;
