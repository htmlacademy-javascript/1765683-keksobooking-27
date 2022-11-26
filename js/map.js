import { getCardItem } from './card.js';

const addressField = document.querySelector('#address');

const CITY_COORDINATES = {
  lat: 35.672855,
  lng: 139.817413,
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas').setView(
  {
    lat: CITY_COORDINATES.lat,
    lng: CITY_COORDINATES.lng,
  },
  10
);

const mainMarker = L.marker(
  {
    lat: CITY_COORDINATES.lat,
    lng: CITY_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const initAddress = () => {
  addressField.value = `${CITY_COORDINATES.lat.toFixed(
    5
  )}, ${CITY_COORDINATES.lng.toFixed(5)}`;
};

const setMainMarkerCoordinate = () => {
  mainMarker.setLatLng({
    lat: CITY_COORDINATES.lat,
    lng: CITY_COORDINATES.lng,
  });
};

const markerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

mainMarker.addTo(markerGroup);

mainMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const setAdPins = (offer) => {
  const marker = L.marker(offer.location, {
    icon: similarPinIcon,
  });

  marker.addTo(markerGroup).bindPopup(getCardItem(offer));
  mainMarker.addTo(markerGroup);
};

const clearMarkers = () => markerGroup.clearLayers();

const resetCoordinate = () => {
  setMainMarkerCoordinate();
  initAddress(CITY_COORDINATES);
};

const onMapLoad = (cb) => {
  map.on('load', () => {
    cb();
  });
};

export {
  CITY_COORDINATES,
  initAddress,
  setMainMarkerCoordinate,
  setAdPins,
  markerGroup,
  clearMarkers,
  resetCoordinate,
  onMapLoad,
};
