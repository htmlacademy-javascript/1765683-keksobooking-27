import { advertForm, DECLINATION_ROOMS, DECLINATION_GUESTS } from './form.js';

const roomNumberField = advertForm.querySelector('#room_number');
const capacityField = advertForm.querySelector('#capacity');
const houseTypeField = advertForm.querySelector('#type');
const priceField = advertForm.querySelector('#price');

const roomsCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const houseTypePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

const validateCapacity = (value) => roomsCapacity[roomNumberField.value].includes(value);

const validatePrice = (value) => +value >= houseTypePrice[houseTypeField.value];

const capacityOptionZero = advertForm.querySelector('[name="capacity"]').querySelector('[value="0"]');

const getCapacityErrorMessage = () => {
  if (roomNumberField.value === '100') {
    return capacityOptionZero.textContent;
  }
  return `Количество гостей: ${roomsCapacity[roomNumberField.value].join(', ')}`;
};

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

pristine.addValidator(priceField, validatePrice, () => `Минимальная цена ${houseTypePrice[houseTypeField.value]}`);

const onRoomNumberChange = () => {
  pristine.validate(capacityField);
};

const onTypeChange = () => {
  priceField.placeholder = houseTypePrice[houseTypeField.value];
  pristine.validate(priceField);
};

roomNumberField.addEventListener('change', onRoomNumberChange);
houseTypeField.addEventListener('change', onTypeChange);

advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
