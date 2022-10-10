const HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const HOUSE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const MIN_PRICE = 1000;
const MAX_PRICE = 2500;
const MIN_ROOM = 1;
const MAX_ROOM = 4;
const MIN_GUEST = 1;
const MAX_GUEST = 6;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 20;
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;
const DIGIT = 5;
const ARRAY_LENGTH = 10;
const AVATAR_TARGET_LENGTH = 2;
const AVATAR_PAD_TEXT = '0';

const getRandomNumber = (min = 0, max = 10, exp = 0) => {
  if (min < 0 || min > max) {
    return NaN;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return randomNumber.toFixed(exp);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

const getAuthor = () => ({
  avatar: `img/avatars/user${getRandomNumber(
    MIN_AVATAR_ID,
    MAX_AVATAR_ID
  ).padStart(AVATAR_TARGET_LENGTH, AVATAR_PAD_TEXT)}.png`,
});

const getOffer = (location = { lat: 0, lng: 0 }) => ({
  title: 'Найдите свой приют',
  address: `${location.lat}, ${location.lng}`,
  price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(HOUSE_TYPES),
  rooms: getRandomNumber(MIN_ROOM, MAX_ROOM),
  guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
  checkin: getRandomArrayElement(CHECK_TIMES),
  checkout: getRandomArrayElement(CHECK_TIMES),
  features: getRandomArrayElement(HOUSE_FEATURES),
  description: '',
  photos: getRandomArrayElement(PHOTOS),
});

const getLocation = () => ({
  lat: getRandomNumber(MIN_LAT, MAX_LAT, DIGIT),
  lng: getRandomNumber(MIN_LNG, MAX_LNG, DIGIT),
});

const getApiItem = () => {
  const location = getLocation();

  return {
    author: getAuthor(),
    offer: getOffer(location),
    location,
  };
};

const getApiArray = () => [Array.from({ length: ARRAY_LENGTH }, getApiItem)];
getApiArray();
