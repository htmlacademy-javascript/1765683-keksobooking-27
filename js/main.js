import './util.js';
import './card.js';
import './form-validation.js';
import './map.js';
import './api.js';
import './slider.js';
import './filter.js';

import { sendData, getData } from './api.js';
import { advertForm, disable, enable } from './form.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { setOnFormSubmit, MIN_PRICE, typeField } from './form-validation.js';
import {
  setMainMarkerCoordinate,
  setAddress,
  CITY_COORDINATES,
  setAdPins,
  clearMarkers,
} from './map.js';
import { priceField, priceFieldSlider } from './form-validation.js';
import { showAlert } from './util.js';
//import { AMOUNT_MARKERS } from './filter.js';

import { filterOffers, onChangeFilter, resetFilters } from './filter.js';

disable();

const resetForm = () => {
  advertForm.reset();
  priceField.value = MIN_PRICE[typeField.value];
  priceFieldSlider.noUiSlider.set(priceField.value);
};

const resetCoordinate = () => {
  setMainMarkerCoordinate();
  setAddress(CITY_COORDINATES);
};

const onGetDataSuccess = (offers) => {
  if (offers.length) {
    enable();
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
  resetFilters();
  showSuccessMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

getData(onGetDataSuccess, showAlert);

export { resetForm };
