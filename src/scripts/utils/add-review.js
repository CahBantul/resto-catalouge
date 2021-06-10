import CONFIG from '../globals/config';

const AddReview = () => {
  const review = {
    id: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5),
    name: document.querySelector('#name').value,
    review: document.querySelector('#comment').value,
  };

  fetch(`${CONFIG.BASE_URL}review`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-Auth-Token': '12345',
    },
    body: JSON.stringify(review),
  })
    .then((res) => res.text())
    .then((teks) => console.log(teks))
    .catch((err) => console.log(err));
};

export default AddReview;
