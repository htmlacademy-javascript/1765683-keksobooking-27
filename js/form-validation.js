import { advertForm } from './form.js';
import { sendData } from './api.js';

const titleField = advertForm.querySelector('#title');
const priceField = advertForm.querySelector('#price');
const roomsField = advertForm.querySelector('#room_number');
const guestsField = advertForm.querySelector('#capacity');
const typeField = advertForm.querySelector('#type');
const checkinTime = advertForm.querySelector('#timein');
const checkoutTime = advertForm.querySelector('#timeout');
const priceFieldSlider = advertForm.querySelector('#slider');
const submitButton = advertForm.querySelector('#submit');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_PRICE = 100000;

const MAX_ROOMS_VALUE = '100';
const MIN_GUESTS_VALUE = '0';

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const pristine = new Pristine(
  advertForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'text-help',
  },
  false
);

const getTitleErrorMessage = () =>
  `Минимальное количество символов ${MIN_TITLE_LENGTH}, максимальное ${MAX_TITLE_LENGTH}`;

const getPriceErrorMessage = () =>
  `От ${MIN_PRICE[typeField.value]} руб. до ${MAX_PRICE} руб.`;

const getCapacityErrorMessage = () => {
  if (roomsField.value === MAX_ROOMS_VALUE) {
    return 'Не для гостей';
  }
  if (guestsField.value === MIN_GUESTS_VALUE) {
    return `Необходимо ${MAX_ROOMS_VALUE} комнат`;
  }
  return `Необходимо минимум ${guestsField.value} комнаты.`;
};

const validateTitle = (value) => {
  if (value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH) {
    return value;
  }
};

const validatePrice = () =>
  priceField.value >= MIN_PRICE[typeField.value] &&
  priceField.value <= MAX_PRICE;

const validateCapacity = () => {
  if (roomsField.value === MAX_ROOMS_VALUE) {
    return guestsField.value === MIN_GUESTS_VALUE;
  } else {
    return (
      roomsField.value >= guestsField.value &&
      guestsField.value !== MIN_GUESTS_VALUE
    );
  }
};

const changeMinPrice = () => {
  priceField.placeholder = MIN_PRICE[typeField.value];
  priceField.min = MIN_PRICE[typeField.value];
};

typeField.addEventListener('change', () => {
  changeMinPrice();
  if (priceField.value) {
    pristine.validate();
  }
});

const onCheckinChange = () => {
  checkoutTime.value = checkinTime.value;
};
const onCheckoutChange = () => {
  checkinTime.value = checkoutTime.value;
};
checkinTime.addEventListener('change', onCheckinChange);
checkoutTime.addEventListener('change', onCheckoutChange);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSendSuccess = () => {};

const onSendFail = () => {};

const setFormSubmit = (onSuccess) => {
  const isValid = pristine.validate();
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onSendFail();
          unblockSubmitButton();
        },
        formData
      );
    }
  });
};

setFormSubmit(onSendSuccess);

noUiSlider.create(priceFieldSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

priceFieldSlider.noUiSlider.on('update', () => {
  priceField.value = priceFieldSlider.noUiSlider.get();
});

const addValidation = () => {
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

  pristine.addValidator(titleField, validateTitle, getTitleErrorMessage);

  pristine.addValidator(guestsField, validateCapacity, getCapacityErrorMessage);
};

addValidation(advertForm);
