const advertForm = document.querySelector('.ad-form');
const formFields = document.querySelectorAll('fieldset');
const mapFiltersList = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const slider = document.querySelector('.ad-form__slider');
const mapSelects = mapFilters.querySelectorAll('select');
const mapInputs = mapFilters.querySelectorAll('input');

const disableForm = () => {
  advertForm.classList.add('ad-form--disabled');
  mapFiltersList.classList.add('map__filters--disabled');
  slider.classList.add('ad-form__slider--disabled');

  formFields.forEach((formField) => {
    formField.disabled = true;
  });
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = true;
  });

  mapSelects.forEach((mapSelect) => {
    mapSelect.disabled = true;
  });
  mapInputs.forEach((mapInput) => {
    mapInput.disabled = true;
  });
};

const toggleForm = () => {
  advertForm.classList.remove('ad-form--disabled');
  mapFiltersList.classList.remove('map__filters--disabled');
  slider.classList.remove('ad-form__slider--disabled');
  formFields.forEach((formField) => {
    formField.disabled = false;
  });
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = false;
  });
  mapSelects.forEach((mapSelect) => {
    mapSelect.disabled = false;
  });
  mapInputs.forEach((mapInput) => {
    mapInput.disabled = false;
  });
};

export { toggleForm, disableForm };
