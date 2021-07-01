const assert = require('assert');

Feature('Liking Restaurants');

Before(() => {
  const { I } = inject();
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restaurants', () => {
  const { I } = inject();
  I.seeElement('#query');
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async () => {
  const { I } = inject();
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  const firstResto = locate('.restaurant__title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const firstLikedRestoTitle = await I.grabTextFrom(firstResto);

  assert.strictEqual(firstRestoTitle, firstLikedRestoTitle);
});

Scenario('searching restaurants', async () => {
  const { I } = inject();
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    '.restaurant-item'
  );
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(
      locate('.restaurant__title').at(index + 1)
    );
    assert.strictEqual(title, visibleTitle);
  });
});
