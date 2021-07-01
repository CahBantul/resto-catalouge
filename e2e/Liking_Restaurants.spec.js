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

Scenario('loking one restaurant', () => {
  const { I } = inject();
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
  I.amOnPage('/');
});
