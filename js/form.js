const advertForm = document.querySelector('.ad-form');
const advertFormSelects = advertForm.querySelectorAll('select');
const advertFormInputs = advertForm.querySelectorAll('input');

const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapInputs = mapFilters.querySelectorAll('input');

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disable(true);
  });
};

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.disable(false);
  });
};

const disable = () => {
  advertForm.classList.add('.ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  disableElements(advertForm);
  disableElements(advertFormSelects);
  disableElements(advertFormInputs);

  disableElements(mapFilters);
  disableElements(mapSelects);
  disableElements(mapInputs);
};

const enable = () => {
  advertForm.classList.remove('.ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  enableElements(advertForm);
  enableElements(advertFormSelects);
  enableElements(advertFormInputs);

  enableElements(mapFilters);
  enableElements(mapSelects);
  enableElements(mapInputs);
};

export { disable, enable };

export { advertForm };
