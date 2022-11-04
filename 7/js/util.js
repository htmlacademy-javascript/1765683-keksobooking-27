import { DefaultNumber } from './data.js';

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
export { getRandomNumber, getRandomArrayElement, getTranslationDeclension };
