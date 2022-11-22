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

const verifyType = (type) => {
  if (typeElement.value === ANY) {
    return true;
  }
  return typeElement.value === type;
};

const verifyPrice = (price) => {
  if (priceElement.value === ANY) {
    return true;
  }
  return isNumberInRange(
    Number(price),
    Price[priceElement.value].MIN,
    Price[priceElement.value].MAX
  );
};

const verifyRooms = (rooms) => {
  if (roomsElement.value === ANY) {
    return true;
  }
  return Number(roomsElement.value) === rooms;
};

const verifyGuests = (guests) => {
  if (guestsElement.value === ANY) {
    return true;
  }
  return Number(guestsElement.value) === guests;
};

const verifyFeatures = (features) =>
  Array.from(featuresCheckBoxesElements).every((featureElement) => {
    if (!featureElement.checked) {
      return true;
    }
    if (!features) {
      return false;
    }
    return features.includes(featureElement.value);
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
  const filteredOffers = offers.filter(
    (offer) =>
      verifyType(offer.offer.type) &&
      verifyPrice(offer.offer.price) &&
      verifyRooms(offer.offer.rooms) &&
      verifyGuests(offer.offer.guests) &&
      verifyFeatures(offer.offer.features)
  );

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
