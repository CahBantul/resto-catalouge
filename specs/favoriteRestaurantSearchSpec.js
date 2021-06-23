import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-restaurant-search-presenter';

describe('Searching restaurants', () => {
  let presenter;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    document.body.innerHTML = `
        <div id="restaurant-search-container">
            <input id="query" type="text">
            <div class="restaurant-result-container">
                <ul class="restaurants">
                </ul>
            </div>
        </div>
        `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteRestaurant, 'searchRestaurants');
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants: FavoriteRestaurant,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    searchRestaurants('resto a');

    expect(presenter.latestQuery).toEqual('resto a');
  });

  it('should ask the model to search for liked restaurants', () => {
    searchRestaurants('resto a');

    expect(FavoriteRestaurant.searchRestaurants).toHaveBeenCalledWith(
      'resto a'
    );
  });

  it('should show the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(1);

    presenter._showFoundRestaurants([
      { id: 1, title: 'Satu' },
      { id: 2, title: 'Dua' },
    ]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(2);
  });

  it('should show the title of the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }]);
    expect(
      document.querySelectorAll('.restaurant__title').item(0).textContent
    ).toEqual('Satu');

    presenter._showFoundRestaurants([
      { id: 1, title: 'Satu' },
      { id: 2, title: 'Dua' },
    ]);

    const restaurantTitles = document.querySelectorAll('.restaurant__title');
    expect(restaurantTitles.item(0).textContent).toEqual('Satu');
    expect(restaurantTitles.item(1).textContent).toEqual('Dua');
  });

  it('should show - for found restaurant without title', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);

    expect(
      document.querySelectorAll('.restaurant__title').item(0).textContent
    ).toEqual('-');
  });
});
