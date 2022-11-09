//import { enable, disable } from './form.js';
import { generateData } from './data.js';
import { dataList } from './card.js';

const address = document.querySelector('#address');
const CITY_COORDINATES = {
  lat: 35.672855,
  lng: 139.817413,
};

const map = L.map('map-canvas').setView(
  {
    lat: CITY_COORDINATES.lat,
    lng: CITY_COORDINATES.lng,
  },
  10
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

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

mainMarker.addTo(markerGroup);

const similarPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

mainMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `lat: ${lat.toFixed(5)}, lng: ${lng.toFixed(5)}`;
});

const createMarker = (data) => {
  const marker = L.marker(
    {
      lat: data.location.lat,
      lng: data.location.lng,
    },
    {
      similarPinIcon,
    }
  );

  marker.addTo(map).bindPopup(generateData(data));
};

dataList.forEach((data) => {
  createMarker(data);
});
