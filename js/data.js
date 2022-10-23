import { getRandomNumber, getRandomArrayElement } from './util.js';
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

const Price = {
  MIN: 1000,
  MAX: 2500,
};
const Room = {
  MIN: 1,
  MAX: 4,
};
const Guest = {
  MIN: 1,
  MAX: 6,
};

const LocationLat = {
  MIN: 35.65,
  MAX: 35.7,
  DEGREES: 5,
};

const LocationLng = {
  MIN: 139.7,
  MAX: 139.8,
  DEGREES: 5,
};

const ARRAY_LENGTH = 10;

const Avatar = {
  LENGTH: 2,
  TEXT: '0',
};

const DefaultNumber = {
  MIN: 0,
  MAX: 10,
  EXP: 0,
};

const MAX_ARRAY_LENGTH = 20;

const getRandomUniqArray = (array) =>
  array.reduce((acc, item) => {
    const isAdd = Math.floor(getRandomNumber(0, 1));

    if (isAdd) {
      return [...acc, item];
    }

    return acc;
  }, []);

const getRandomArray = (elements) => {
  const arrayLength = Math.floor(
    getRandomNumber(DefaultNumber.MIN, MAX_ARRAY_LENGTH)
  );

  return Array.from({ length: arrayLength }, () =>
    getRandomArrayElement(elements)
  );
};

const getAuthor = (index) => {
  const id = (index + 1).toFixed(0).padStart(Avatar.LENGTH, Avatar.TEXT);

  return {
    avatar: `img/avatars/user${id}.png`,
  };
};

const getOffer = (location = { lat: 0, lng: 0 }) => ({
  title: 'Найдите свой приют',
  address: `${location.lat}, ${location.lng}`,
  price: getRandomNumber(Price.MIN, Price.MAX),
  type: getRandomArrayElement(HOUSE_TYPES),
  rooms: getRandomNumber(Room.MIN, Room.MAX),
  guests: getRandomNumber(Guest.MIN, Guest.MAX),
  checkin: getRandomArrayElement(CHECK_TIMES),
  checkout: getRandomArrayElement(CHECK_TIMES),
  features: getRandomUniqArray(HOUSE_FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getRandomArray(PHOTOS),
});

const getLocation = () => ({
  lat: getRandomNumber(LocationLat.MIN, LocationLat.MAX, LocationLat.DEGREES),
  lng: getRandomNumber(LocationLng.MIN, LocationLng.MAX, LocationLng.DEGREES),
});

const getApiItem = (_, index) => {
  const location = getLocation();

  return {
    author: getAuthor(index),
    offer: getOffer(location),
    location,
  };
};

const getApiArray = () => Array.from({ length: ARRAY_LENGTH }, getApiItem);
getApiArray();

export { getApiItem, getApiArray };
