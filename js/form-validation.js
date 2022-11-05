import { advertForm } from './form.js';

const titleField = advertForm.querySelector('#title');
const priceField = advertForm.querySelector('#price');
const roomsField = advertForm.querySelector('#room_number');
const guestsField = advertForm.querySelector('#capacity');
const typeField = advertForm.querySelector('#type');

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

const setPricePlaceholder = () => {
  priceField.placeholder = MIN_PRICE[typeField.value];
};

typeField.addEventListener('change', () => {
  setPricePlaceholder();
  if (priceField.value) {
    pristine.validate();
  }
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const addValidation = () => {
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

  pristine.addValidator(titleField, validateTitle, getTitleErrorMessage);

  pristine.addValidator(guestsField, validateCapacity, getCapacityErrorMessage);
};

advertForm.addEventListener('submit', onFormSubmit);

addValidation(advertForm);
