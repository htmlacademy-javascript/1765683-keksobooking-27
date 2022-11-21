import { priceField, priceFieldSlider, typeField, MIN_PRICE } from './form-validation.js';

const advertForm = document.querySelector('.ad-form');
const advertFormFieldset = document.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

const disableElements = (element) => {
  element.disable = true;
};

const enableElements = (element) => {
  element.disable = false;
};

const disable = () => {
  advertForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  disableElements(advertForm);
  disableElements(advertFormFieldset);

  disableElements(mapFilters);
  disableElements(mapFiltersFieldset);
};

const enable = () => {
  advertForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  enableElements(advertForm);
  enableElements(advertFormFieldset);

  enableElements(mapFilters);
  enableElements(mapFiltersFieldset);
};

const resetForm = () => {
  advertForm.reset();
  priceField.value = MIN_PRICE[typeField.value];
  priceFieldSlider.noUiSlider.set(priceField.value);
};

export { disable, enable };

export { advertForm, resetForm };