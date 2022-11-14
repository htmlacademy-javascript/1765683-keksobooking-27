const dataURL = 'https://27.javascript.pages.academy/keksobooking/data';
const serverURL = 'https://27.javascript.pages.academy/keksobooking';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(dataURL);

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
    const response = await fetch(serverURL, {
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
