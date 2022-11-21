import './util.js';
import './card.js';
import './form-validation.js';
import './map.js';
import './api.js';
import './slider.js';
import './filter.js';

import { sendData, getData } from './api.js';
import { disable, enable, resetForm } from './form.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { setOnFormSubmit } from './form-validation.js';
import { setAdPins, clearMarkers, resetCoordinate } from './map.js';
import { showAlert } from './util.js';
import { filterOffers, onChangeFilter, resetFilters } from './filter.js';

disable();

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