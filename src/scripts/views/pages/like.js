import FavoriteRestaurant from '../../data/favorite-restaurant';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantSearchView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurant,
    });
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurant,
    });
  },
};

export default Like;
