import { advertForm } from './form.js';
//import { getTranslationDeclension } from './util.js';

const titleField = advertForm.querySelector('#title');
const priceField = advertForm.querySelector('#price');
const roomsField = advertForm.querySelector('#room_number');
const capacityField = advertForm.querySelector('#capacity');
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
  if (capacityField.value === MIN_GUESTS_VALUE) {
    return `Необходимо ${MAX_ROOMS_VALUE} комнат`;
  }
  return `Необходимо минимум ${capacityField.value} комнаты.`;
};

const validateTitle = (value) => {
  if (value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH) {
    return value;
  }
};

const validatePrice = (value) => {
  if (
    value >= MIN_PRICE[typeField.value] &&
    value <= MAX_PRICE[typeField.value]
  ) {
    return +value;
  }
};

const validateCapacity = () => {
  if (roomsField.value === MAX_ROOMS_VALUE) {
    return capacityField.value === MIN_GUESTS_VALUE;
  } else {
    return (
      roomsField.value >= capacityField.value &&
      capacityField.value !== MIN_GUESTS_VALUE
    );
  }
};

const setPricePlaceholder = () => {
  priceField.placeholder = MIN_PRICE[typeField.value];
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

pristine.addValidator(titleField, validateTitle, getTitleErrorMessage);

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
