'use strict';


const MAP = document.querySelector(`.map`);
const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECK_IN_OUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_Y = {
  MIN: 130,
  MAX: 630
};
const PIN_SIZE = {
  X: 50,
  Y: 70
};
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`button`);
const PIN_IMG_TEMPLATE = PIN_TEMPLATE.querySelector(`img`).cloneNode();
const PIN_NUM = 8;
// card template
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`article`);
const POPUP_AVATAR = CARD_TEMPLATE.querySelector(`.popup__avatar`);
const POPUP_CLOSE = CARD_TEMPLATE.querySelector(`.popup__close`);
const POPUP_TITLE = CARD_TEMPLATE.querySelector(`.popup__title`);
const POPUP_TEXT_ADDRESS = CARD_TEMPLATE.querySelector(`.popup__text--address`);
const POPUP_TEXT_PRICE = CARD_TEMPLATE.querySelector(`.popup__text--price`);
const POPUP_TYPE = CARD_TEMPLATE.querySelector(`.popup__type`);
const POPUP_TEXT_CAPACITY = CARD_TEMPLATE.querySelector(`.popup__text--capacity`);
const POPUP_TEXT_TIME = CARD_TEMPLATE.querySelector(`.popup__text--time`);
const POPUP_FEATURES = CARD_TEMPLATE.querySelector(`.popup__features`);
const POPUP_FEATURE = CARD_TEMPLATE.querySelector(`.popup__feature`);
const POPUP_DESCRIPTION = CARD_TEMPLATE.querySelector(`.popup__description`);
const POPUP_PHOTOS = CARD_TEMPLATE.querySelector(`.popup__photos`);
const POPUP_PHOTO = CARD_TEMPLATE.querySelector(`.popup__photo`);
const MAP_FILTERS_CONTAINER = document.querySelector(`.map__filters-container`);
let fieldWidth = MAP.offsetWidth;
let mapPins = document.querySelector(`.map__pins`);

let getRandomNum = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

let getRandomElNum = function (array) {
  return getRandomNum(0, array.length - 1);
};

let getRandomElOfArr = function (array, multiple) {
  if (multiple) {
    let start = getRandomElNum(array);
    let end = getRandomNum(start, array.length);
    return array.slice(start, end);
  } else {
    return array[getRandomElNum(array)];
  }
};

let getAdObj = function () {
  let locationX = getRandomNum(0, fieldWidth);
  let locationY = getRandomNum(LOCATION_Y.MIN, LOCATION_Y.MAX);
  let newAdObj = {
    author: {
      avatar: `img/avatars/user0${getRandomNum(1, 8)}.png`,
    },
    offer: {
      title: `Объявление - ${getRandomNum(123, 999)}`,
      address: `${locationX}, ${locationY}`,
      price: getRandomNum(10, 90000),
      type: getRandomElOfArr(HOUSING_TYPES),
      rooms: getRandomNum(1, 100),
      guests: getRandomNum(1, 100),
      checkin: getRandomElOfArr(CHECK_IN_OUT_TIMES),
      checkout: getRandomElOfArr(CHECK_IN_OUT_TIMES),
      features: getRandomElOfArr(FEATURES, true),
      description: `Посредник. Комиссия. Фото из интернета. Все вопросы по телефону. :P`,
      photos: getRandomElOfArr(PHOTOS, true)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return newAdObj;
};

let getAdsArr = function () {
  let newArr = [];
  for (let i = 0; i < PIN_NUM; i++) {
    newArr[i] = getAdObj();
  }
  return newArr;
};

let adsArr = getAdsArr();

MAP.classList.remove(`map--faded`);

let renderPin = function (arrEl) {
  let newPin = PIN_TEMPLATE.cloneNode();
  let newPinImg = PIN_IMG_TEMPLATE.cloneNode();
  newPin.setAttribute(`style`, `left: ${arrEl.location.x - PIN_SIZE.X / 2}px; top: ${arrEl.location.y - PIN_SIZE.Y}px`);
  newPinImg.src = arrEl.author.avatar;
  newPinImg.alt = arrEl.offer.title;
  newPin.append(newPinImg);
  return newPin;
};

let renderPins = function () {
  let fragment = document.createDocumentFragment();
  for (let arrEl of adsArr) {
    fragment.appendChild(renderPin(arrEl));
  }
  return fragment;
};

mapPins.appendChild(renderPins());

let getOfferType = function (offerType) {
  if (offerType === `palace`) {
    return `Дворец`;
  } else if (offerType === `flat`) {
    return `Квартира`;
  } else if (offerType === `house`) {
    return `Дом`;
  } else if (offerType === `bungalow`) {
    return `Бунгало`;
  } else {
    return offerType;
  }
};

let renderCardFeature = function (feature) {
  let newPopupFeature = POPUP_FEATURE.cloneNode();
  newPopupFeature.classList.remove(`popup__feature--wifi`);
  newPopupFeature.classList.add(`popup__feature--${feature}`);
  return newPopupFeature;
};

let renderPhoto = function (photo) {
  let newPopupPhoto = POPUP_PHOTO.cloneNode();
  newPopupPhoto.src = photo;
  return newPopupPhoto;
};

let renderElements = function (featuresArr, functionName) {
  let fragment = document.createDocumentFragment();
  for (let featureEl of featuresArr) {
    fragment.appendChild(functionName(featureEl));
  }
  return fragment;
};

let renderCard = function (arrEl) {
  let newCard = CARD_TEMPLATE.cloneNode();
  let newPopupClose = POPUP_CLOSE.cloneNode();
  let newPopupAvatar = POPUP_AVATAR.cloneNode();
  newPopupAvatar.src = arrEl.author.avatar;
  let newPopupTitle = POPUP_TITLE.cloneNode();
  newPopupTitle.textContent = arrEl.offer.title;
  let newPopupAddress = POPUP_TEXT_ADDRESS.cloneNode();
  newPopupAddress.textContent = arrEl.offer.address;
  let newPopupPrice = POPUP_TEXT_PRICE.cloneNode();
  newPopupPrice.textContent = `${arrEl.offer.price}₽/ночь`;
  let newPopupType = POPUP_TYPE.cloneNode();
  newPopupType.textContent = getOfferType(arrEl.offer.type);
  let newPopupCapacity = POPUP_TEXT_CAPACITY.cloneNode();
  newPopupCapacity.textContent = `${arrEl.offer.rooms} комнаты для ${arrEl.offer.guests} гостей`;
  let newPopupTime = POPUP_TEXT_TIME.cloneNode();
  newPopupTime.textContent = `Заезд после ${arrEl.offer.checkin}, выезд до ${arrEl.offer.checkout}`;
  let newPopupFeatures = POPUP_FEATURES.cloneNode();
  newPopupFeatures.appendChild(renderElements(arrEl.offer.features, renderCardFeature));
  let newPopupDescription = POPUP_DESCRIPTION.cloneNode();
  newPopupDescription.textContent = arrEl.offer.description;
  let newPopupPhotos = POPUP_PHOTOS.cloneNode();
  newPopupPhotos.appendChild(renderElements(arrEl.offer.photos, renderPhoto));
  newCard.appendChild(newPopupClose);
  newCard.appendChild(newPopupAvatar);
  newCard.appendChild(newPopupTitle);
  newCard.appendChild(newPopupAddress);
  newCard.appendChild(newPopupPrice);
  newCard.appendChild(newPopupType);
  newCard.appendChild(newPopupCapacity);
  newCard.appendChild(newPopupTime);
  newCard.appendChild(newPopupFeatures);
  newCard.appendChild(newPopupDescription);
  newCard.appendChild(newPopupPhotos);
  return newCard;
};

MAP.insertBefore(renderCard(adsArr[0]), MAP_FILTERS_CONTAINER);
