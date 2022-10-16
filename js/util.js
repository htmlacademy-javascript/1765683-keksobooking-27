import DefaultNumber from './data.js';

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

export { getRandomNumber, getRandomArrayElement };
