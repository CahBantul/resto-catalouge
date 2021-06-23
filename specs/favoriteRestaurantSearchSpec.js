import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-restaurant-search-presenter';

describe('Searching restaurants', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div id="restaurant-search-container">
            <input id="query" type="text">
            <div class="restaurant-result-container">
                <ul class="restaurants">
                </ul>
            </div>
        </div>
        `;
  });

  it('should be able to capture the query typed by the user', () => {
    spyOn(FavoriteRestaurant, 'searchRestaurants');
    const presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants: FavoriteRestaurant,
    });

    const queryElement = document.getElementById('query');
    queryElement.value = 'resto a';
    queryElement.dispatchEvent(new Event('change'));

    expect(presenter.latestQuery).toEqual('resto a');
  });

  it('should ask the model to search for liked restaurants', () => {
    spyOn(FavoriteRestaurant, 'searchRestaurants');
    const presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants: FavoriteRestaurant,
    });

    const queryElement = document.getElementById('query');
    queryElement.value = 'resto a';
    queryElement.dispatchEvent(new Event('change'));

    expect(FavoriteRestaurant.searchRestaurants).toHaveBeenCalledWith(
      'resto a'
    );
  });
});
