import FavoriteMovieIdb from '../../data/favorite-restaurant';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Restaurants</h2>
        <div id="restaurants" class="restaurants">

        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteMovieIdb.getAllMovies();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML +=
        createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Like;
