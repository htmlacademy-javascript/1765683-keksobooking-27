import {
  getTranslationDeclension,
  DECLINATION_GUESTS,
  DECLINATION_ROOMS,
  HOUSE_FEATURES,
  TEXT_TRANSLATE,
} from './util.js';

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const cardListFragment = document.createDocumentFragment();

const renderDescription = (cardElement, description) => {
  const descriptionElement = cardElement.querySelector('.popup__description');
  if (description && description.length) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }
};

const createPhoto = (photo, title) => {
  const photoElement = document.createElement('img');
  photoElement.classList.add('popup__photo');
  photoElement.src = photo;
  photoElement.alt = title;
  photoElement.width = '45';
  photoElement.height = '40';
  return photoElement;
};

const renderPhoto = (cardElement, photos, title) => {
  const photoList = cardElement.querySelector('.popup__photos');
  if (photos && photos.length) {
    photoList.innerHTML = '';
    photos.forEach((photo) => {
      const photoElement = createPhoto(photo, title);
      photoList.append(photoElement);
    });
  } else {
    photoList.remove();
  }
};

const renderCardElements = (cardElement, title, address, price, type) => {
  const offerTitle = cardElement.querySelector('.popup__title');
  if (title && title.length) {
    offerTitle.textContent = title;
  } else {
    offerTitle.remove();
  }

  const offerAddress = cardElement.querySelector('.popup__text--address');
  if (address && address.length) {
    offerAddress.textContent = address;
  } else {
    offerAddress.remove();
  }


  const offerPrice = cardElement.querySelector('.popup__text--price');
  if (price && price >= 0) {
    offerPrice.textContent = price;
  } else {
    offerPrice.remove();
  }

  const housingType = cardElement.querySelector('.popup__type');
  if (type) {
    const text = TEXT_TRANSLATE[type];
    housingType.textContent = text;
  }
};

const renderFeatures = (cardElement, features) => {
  if (features) {
    const featureList = cardElement.querySelector('.popup__features');
    featureList.innerHTML = '';

    features.forEach((feature) => {
      const featureListItem = document.createElement('li');

      featureListItem.classList.add('popup__feature');
      featureListItem.classList.add(`popup__feature--${feature}`);
      featureListItem.textContent = HOUSE_FEATURES[feature];

      featureList.append(featureListItem);
    });
  }
};

const getCardItem = (item) => {
  const { author, offer } = item;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent =
    offer.address;
  cardElement.querySelector('[data-price]').textContent = offer.price;
  cardElement.querySelector('.popup__type').textContent =
    TEXT_TRANSLATE[offer.type];
  cardElement.querySelector(
    '.popup__text--capacity'
  ).textContent = `${getTranslationDeclension(
    offer.rooms,
    DECLINATION_ROOMS
  )} для ${getTranslationDeclension(offer.guests, DECLINATION_GUESTS)}`;
  cardElement.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  renderDescription(cardElement, offer.description);
  renderFeatures(cardElement, offer.features);
  renderPhoto(cardElement, offer.photos, offer.title);
  renderCardElements(
    cardElement,
    offer.title,
    offer.address,
    offer.price,
    offer.type
  );
  cardListFragment.appendChild(cardElement);
  return cardElement;
};

document.querySelector('#map-canvas').appendChild(cardListFragment);

export { cardListFragment, getCardItem };
