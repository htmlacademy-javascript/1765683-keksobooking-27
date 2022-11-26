import { priceField, typeField, MIN_PRICE } from './form-validation.js';
import { priceFieldSlider } from './form-validation.js';

const advertForm = document.querySelector('.ad-form');
const advertFormFieldsets = document.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

const disableElements = (element) => {
  element.disabled = false;
};

const enableElements = (element) => {
  element.disabled = true;
};

const disable = () => {
  advertForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  disableElements(advertForm);
  disableElements(advertFormFieldsets);

  disableElements(mapFilters);
  disableElements(mapFiltersFieldsets);
};

const enable = () => {
  advertForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  enableElements(advertForm);
  enableElements(advertFormFieldsets);

  enableElements(mapFilters);
  enableElements(mapFiltersFieldsets);
};

const resetForm = () => {
  advertForm.reset();
  priceField.value = MIN_PRICE[typeField.value];
  priceFieldSlider.noUiSlider.set(priceField.value);
};

export { advertForm, disable, enable, resetForm };
