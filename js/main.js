const getRandomInteger = (min, max, exp) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }

  if (min < 0 || min > max) {
    return NaN;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return randomNumber.toFixed(exp);
};
