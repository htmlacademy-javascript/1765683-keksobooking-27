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

const DESCRIPTIONS = [
  'Стандартный однокомнатный номер, чаще всего с прихожей, санузлом и балконом. Номер категории Стандарт можно встретить в отелях с небольшим количеством звезд. Размер комнаты в среднем составляет 16-22 кв. м. и предназначен в основном для проживания одного или двух гостей.',
  'Улучшенный номер, который отличается метражом. Такая категория номера в основном имеет схожие признаки со стандартным, но он выполнен в более изысканном дизайне, с применением более качественной отделки, современной техники и стильной мебели.',
  'Компактный номер, в котором гостиная совмещена с кухней. Такой тип жилья напоминает квартиры-студии. В нем имеется всё необходимое для проживания: кровать, кухонный уголок с плитой и посудой. Площадь номера не превышает 20 кв.м., что вполне комфортно для проживания 1-2 человек.',
];

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const PRICE = {
  min: 1000,
  max: 2500,
};
const ROOM = {
  min: 1,
  max: 4,
};
const GUEST = {
  min: 1,
  max: 6,
};
const AVATAR_ID = {
  min: 1,
  max: 20,
};

const LOCATION_LAT = {
  min: 35.65,
  max: 35.7,
};

const LOCATION_LNG = {
  min: 139.7,
  max: 139.8,
};

const DIGIT = 5;
const ARRAY_LENGTH = 10;

const AVATAR = {
  length: 2,
  text: '0',
};

const RANDOM_MAX_NUMBER = 10;

const getRandomNumber = (min = 0, max = RANDOM_MAX_NUMBER, exp = 0) => {
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
    AVATAR_ID.min,
    AVATAR_ID.max
  ).padStart(AVATAR.length, AVATAR.text)}.png`,
});

const getOffer = (location = { lat: 0, lng: 0 }) => ({
  title: 'Найдите свой приют',
  address: `${location.lat}, ${location.lng}`,
  price: getRandomNumber(PRICE.min, PRICE.max),
  type: getRandomArrayElement(HOUSE_TYPES),
  rooms: getRandomNumber(ROOM.min, ROOM.max),
  guests: getRandomNumber(GUEST.min, GUEST.max),
  checkin: getRandomArrayElement(CHECK_TIMES),
  checkout: getRandomArrayElement(CHECK_TIMES),
  features: getRandomArrayElement(HOUSE_FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getRandomArrayElement(PHOTOS),
});

const getLocation = () => ({
  lat: getRandomNumber(LOCATION_LAT.min, LOCATION_LAT.max, DIGIT),
  lng: getRandomNumber(LOCATION_LNG.min, LOCATION_LNG.max, DIGIT),
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
