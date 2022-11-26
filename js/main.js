import './util.js';
import './card.js';
import './form-validation.js';
import './map.js';
import './api.js';
import './slider.js';
import './filter.js';
import './photo.js';

import { sendData, getData } from './api.js';
import { enable, disable, resetForm } from './form.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { setOnFormSubmit } from './form-validation.js';

import {
  resetCoordinate,
  setAdPins,
  clearMarkers,
  initAddress,
  onMapLoad,
} from './map.js';

import {
  filtersContainerElement,
  filterWatcher,
  filterOffers,
  onChangeFilter,
  resetFilters,
} from './filter.js';
import { resetPhoto } from './photo.js';

const onFormDisableState = () => {
  filtersContainerElement.removeEventListener('change', filterWatcher);
  disable();
};

onFormDisableState();

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
  resetPhoto();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

onMapLoad(getData(onGetDataSuccess));

export { onGetDataSuccess };
