const DATA_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const SERVER_URL = 'https://27.javascript.pages.academy/keksobooking';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error('Не удалось загрузить объявления');
    }
    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body,
    });

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
