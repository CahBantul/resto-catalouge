import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
            < class="content">
              <input id="query" type="text">
              <h2 class="content__heading">Your Liked Restaurant</h2>
                  <div id="restaurants" class="restaurants">

                  </div>
            </div>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(createRestaurantItemTemplate(restaurant)),
        ''
      );
    } else {
      html = this._getEmptyMovieTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document
      .getElementById('restaurants')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyMovieTemplate() {
    return '<div class="restaurant-item__not__found">Film tidak ditemukan</div>';
  }
}

export default FavoriteRestaurantSearchView;
