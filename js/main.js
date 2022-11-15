import './data.js';
import './util.js';
import './card.js';
import './form-validation.js';
import './map.js';
import './api.js';
import './slider.js';

import { sendData, getData } from './api.js';
import { advertForm, disable, enable } from './form.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { setOnFormSubmit } from './form-validation.js';
import {
  setMainMarkerCoordinate,
  setAddress,
  CITY_COORDINATES,
  setAdPins,
} from './map.js';
import { priceField, priceFieldSlider } from './form-validation.js';
//import { getCardItem } from './card.js';
import { showAlert } from './util.js';

//const SIMILAR_OFFERS_COUNT = 10;
/*
getData((offers) => {
  getCardItem(offers.slice(0, SIMILAR_OFFERS_COUNT));
});
*/
const resetForm = () => {
  advertForm.reset();
  priceFieldSlider.noUiSlider.set(priceField.value);
};

const resetCoordinate = () => {
  setMainMarkerCoordinate();
  setAddress(CITY_COORDINATES);
};

const onGetDataSuccess = (offers) => {
  setAdPins(offers);
  enable();
};

const onSendDataSuccess = () => {
  resetForm();
  resetCoordinate();
  showSuccessMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});


getData(onGetDataSuccess, showAlert);
