import { getApiArray } from './data';

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const TEXT_TRANSLATE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const newCard = getApiArray();

const cardListFragment = document.createDocumentFragment();

const renderDescription = (cardElement, description) => {
  const descriptionElement = cardElement.querySelector('.popup__description');
  if (description && description.length) {
    descriptionElement.textContent = description;
  }
  descriptionElement.remove();
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
  }
  photoList.remove();
};

const renderTitle = (cardElement, title) => {
  const offerTitle = cardElement.querySelector('.popup__title');
  if (title && title.length) {
    offerTitle.textContent = title;
  }
  offerTitle.remove();
};

const renderAddress = (cardElement, address) => {
  const offerAddress = cardElement.querySelector('.popup__text--address');
  if (address && address.length) {
    offerAddress.textContent = address;
  }
  offerAddress.remove();
};

const renderPrice = (cardElement, price) => {
  const offerPrice = cardElement.querySelector('.popup__text--price');
  if (price && price.length) {
    offerPrice.textContent = price;
  }
  offerPrice.remove();
};

const renderHousingType = (cardElement, type) => {
  const housingType = cardElement.querySelector('.popup__type');
  if (type && type.length) {
    housingType.textContent = type;
  }
  housingType.remove();
  TEXT_TRANSLATE.forEach((houseType) => {
    if ((houseType = type)) {
      type.textContent = houseType.textContent;
    }
    type.remove();
  });
};

const renderFeatures = (cardElement, features) => {
  const featureList = cardElement.querySelector('.popup__features');
  const featureItems = cardElement.querySelectorAll('.popup_feature');
  if (features && features.length) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    featureItems.forEach((featureItem) => {
      const modifier = featureItem.classList[1];
      if (modifiers.includes(modifier)) {
        featureItem.remove();
      }
    });
  }
  featureList.remove();
};

newCard.forEach(({ author, offer }) => {
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
  ).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  renderDescription(cardElement, offer.description);
  renderFeatures(cardElement, offer.features);
  renderPhoto(cardElement, offer.photos, offer.title);
  renderTitle(cardElement, offer.title);
  renderAddress(cardElement, offer.address);
  renderPrice(cardElement, offer.price);
  renderHousingType(cardElement, offer.type);

  cardListFragment.appendChild(cardElement);
});
