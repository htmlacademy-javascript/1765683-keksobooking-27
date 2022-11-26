import './util.js';
import './card.js';
import './form-validation.js';
import './map.js';
import './api.js';
import './slider.js';
import './filter.js';
import './photo.js';

import { sendData, getData } from './api.js';
import { advertForm, enable, disable } from './form.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { setOnFormSubmit, typeField, MIN_PRICE } from './form-validation.js';
import {
  setMainMarkerCoordinate,
  CITY_COORDINATES,
  setAdPins,
  clearMarkers,
  initAddress,
  onMapLoad,
} from './map.js';
import { priceField, priceFieldSlider } from './form-validation.js';
import { showAlert } from './util.js';
import {
  filtersContainerElement,
  filterWatcher,
  filterOffers,
  onChangeFilter,
  resetFilters,
} from './filter.js';

const onFormDisableState = () => {
  filtersContainerElement.removeEventListener('change', filterWatcher);
  disable();
};

onFormDisableState();

const resetForm = () => {
  advertForm.reset();
  priceField.value = MIN_PRICE[typeField.value];
  priceFieldSlider.noUiSlider.set(priceField.value);
};

const resetCoordinate = () => {
  setMainMarkerCoordinate();
  initAddress(CITY_COORDINATES);
};

const onGetDataSuccess = (offers) => {
  if (offers.length) {
    enable();
    initAddress();
  }
  clearMarkers();
  const filteredOffers = filterOffers(offers);
  filteredOffers.forEach((offer) => setAdPins(offer));
  enable();
  onChangeFilter(() => filterOffers(offers));
};

const onSendDataSuccess = () => {
  resetForm();
  resetCoordinate();
  showSuccessMessage();
  resetFilters();
  initAddress();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

onMapLoad(getData(onGetDataSuccess, showAlert));
