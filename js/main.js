const getRandomNumber = (min = 0, max = 10, exp = 0) => {
  if (min < 0 || min > max) {
    return NaN;
  }

  const randomNumber = Math.random() * (max - min) + min;

  return randomNumber.toFixed(exp);
};

getRandomNumber();
