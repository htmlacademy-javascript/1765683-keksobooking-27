const getRandomNumber = (min = 0, max = 10, exp = 0) => {
  if (min < 0 || min > max) {
    return NaN;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return randomNumber.toFixed(exp);
};

// getRandomNumber();
//
// const AUTHOR = {
// avatar:
// };
//
// const OFFER = {
// title: Найдите свой приют,
// address: 123,
// price: 213,
// type: [palace, flat, house, bungalow, hotel],
// rooms: 345,
// guests: 567,
// checkin: [12:00, 13:00, 14:00],
// checkout: [12:00, 13:00, 14:00],
// features: [wifi, dishwasher, parking, washer, elevator, conditioner],
// description: 789,
// photos: [https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg,
// https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,
// https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg
// ]
// };
//
const getAuthor = () => ({});

const getOffer = () => ({});

const getLocation = () => ({
  lat: getRandomNumber(35.65, 35.7, 5),
  lng: getRandomNumber(139.7, 139.8, 5),
});

const getApiItem = () => ({
  author: getAuthor(),
  offer: getOffer(),
  location: getLocation(),
});

const getApiArray = () => [Array.from({ length: 10 }, getApiItem)];
console.dir(JSON.stringify(getApiArray()));
