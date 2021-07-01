import UrlParser from '../../routes/url-parser';
import RestaurantsSource from '../../data/restaurants-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurant from '../../data/favorite-restaurant';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    // lazy load font awesome
    let scriptElement = document.querySelector(
      'script[src="https://use.fontawesome.com/b070c8f1df.js"]',
    );

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://use.fontawesome.com/b070c8f1df.js';
      document.body.appendChild(scriptElement);
    }
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantsSource.detailRestaurant(url.id);

    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurant,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        city: restaurant.city,
      },
    });
  },
};

export default Detail;
