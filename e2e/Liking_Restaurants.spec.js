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

Scenario('liking one restaurant', () => {
  const { I } = inject();
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
});
