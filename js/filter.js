import { isNumberInRange, debounce } from './util.js';
import { markerGroup, setAdPins } from './map.js';

const ANY = 'any';
const AMOUNT_MARKERS = 10;
const RENDER_DELAY = 500;

const Price = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: 1000000,
  },
};

const filtersContainerElement = document.querySelector('.map__filters');
const typeElement = filtersContainerElement.querySelector('#housing-type');
const priceElement = filtersContainerElement.querySelector('#housing-price');
const roomsElement = filtersContainerElement.querySelector('#housing-rooms');
const guestsElement = filtersContainerElement.querySelector('#housing-guests');
const featuresCheckBoxesElements = filtersContainerElement.querySelectorAll(
  'input[name="features"]'
);

const compareAds = (adsA, adsB) => {
  const rankA = adsA.offer.features ? adsA.offer.features.length : 0;
  const rankB = adsB.offer.features ? adsB.offer.features.length : 0;
  return rankB - rankA;
};

const getFilterType = (offer) => {
  if (typeElement.value === ANY) {
    return true;
  }
  return typeElement.value === offer.offer.type;
};

const getFilterPrice = (offer) => {
  if (priceElement.value === ANY) {
    return true;
  }
  return isNumberInRange(
    Number(offer.offer.price),
    Price[priceElement.value].MIN,
    Price[priceElement.value].MAX
  );
};

const getFilterRooms = (offer) => {
  if (roomsElement.value === ANY) {
    return true;
  }
  return Number(roomsElement.value) === offer.offer.rooms;
};

const getFilterGuests = (offer) => {
  if (guestsElement.value === ANY) {
    return true;
  }
  return Number(guestsElement.value) === offer.offer.guests;
};

const chooseFeatures = (offer) =>
  Array.from(featuresCheckBoxesElements).every((featureElement) => {
    if (!featureElement.checked) {
      return true;
    }
    if (!offer.offer.features) {
      return false;
    }
    return offer.offer.features.includes(featureElement.value);
  });

const onChangeFilter = (cb) => {
  filtersContainerElement.addEventListener(
    'change',
    debounce(() => {
      markerGroup.clearLayers();
      const filteredOffers = cb();
      filteredOffers.forEach((offer) => setAdPins(offer));
    }, RENDER_DELAY)
  );
};

const filterOffers = (offers) => {
  const filteredOffers = offers
    .filter(getFilterType)
    .filter(getFilterPrice)
    .filter(getFilterRooms)
    .filter(getFilterGuests)
    .filter(chooseFeatures);

  return filteredOffers.sort(compareAds).slice(0, AMOUNT_MARKERS);
};

const resetFilters = () => {
  typeElement.value = ANY;
  roomsElement.value = ANY;
  priceElement.value = ANY;
  guestsElement.value = ANY;
  featuresCheckBoxesElements.forEach((element) => {
    element.checked = false;
  });
};

export { filterOffers, onChangeFilter, resetFilters, AMOUNT_MARKERS };
