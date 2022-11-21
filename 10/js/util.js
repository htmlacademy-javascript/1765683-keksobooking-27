const ALERT_SHOW_TIME = 5000;

const DefaultNumber = {
  MIN: 0,
  MAX: 10,
  EXP: 0,
};

const TEXT_TRANSLATE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const HOUSE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DECLINATION_GUESTS = ['гостя', 'гостей', 'гостей'];

const DECLINATION_ROOMS = ['комната', 'комнаты', 'комнат'];

const getRandomNumber = (
  min = DefaultNumber.MIN,
  max = DefaultNumber.MAX,
  exp = DefaultNumber.EXP
) => {
  if (min < 0 || min > max) {
    return NaN;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return randomNumber.toFixed(exp);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

const getTranslationDeclension = (count, array) => {
  if (count < 1) {
    return '';
  }

  if (count < 2) {
    return `1 ${array[0]}`;
  }
  if (count < 5) {
    return `${count} ${array[1]}`;
  }
  return `${count} ${array[2]}`;
};

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30 px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.style.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomNumber,
  getRandomArrayElement,
  getTranslationDeclension,
  showAlert,
  TEXT_TRANSLATE,
  HOUSE_FEATURES,
  DECLINATION_GUESTS,
  DECLINATION_ROOMS,
};