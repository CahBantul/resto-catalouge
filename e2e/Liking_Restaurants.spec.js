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
