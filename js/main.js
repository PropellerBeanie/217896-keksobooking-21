'use strict';


const MAP = document.querySelector(`.map`);
const MAP_FILTERS_CONTAINER = document.querySelector(`.map__filters-container`);
const HOUSING_TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
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
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`article`);
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
      type: getRandomElOfArr(Object.keys(HOUSING_TYPES)),
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

let renderCardFeature = function (feature) {
  let popupFeature = CARD_TEMPLATE.querySelector(`.popup__feature`);
  let newPopupFeature = popupFeature.cloneNode();
  newPopupFeature.classList.remove(`popup__feature--wifi`);
  newPopupFeature.classList.add(`popup__feature--${feature}`);
  return newPopupFeature;
};

let renderPhoto = function (photo) {
  let popupPhoto = CARD_TEMPLATE.querySelector(`.popup__photo`);
  let newPopupPhoto = popupPhoto.cloneNode();
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

  let newCard = CARD_TEMPLATE.cloneNode(true);
  let popupAvatar = newCard.querySelector(`.popup__avatar`);
  popupAvatar.src = arrEl.author.avatar;
  let popupTitle = newCard.querySelector(`.popup__title`);
  popupTitle.textContent = arrEl.offer.title;
  let popupAddress = newCard.querySelector(`.popup__text--address`);
  popupAddress.textContent = arrEl.offer.address;
  let popupPrice = newCard.querySelector(`.popup__text--price`);
  popupPrice.textContent = `${arrEl.offer.price}₽/ночь`;
  let popupType = newCard.querySelector(`.popup__type`);
  popupType.textContent = HOUSING_TYPES[arrEl.offer.type];
  let popupCapacity = newCard.querySelector(`.popup__text--capacity`);
  popupCapacity.textContent = `${arrEl.offer.rooms} комнаты для ${arrEl.offer.guests} гостей`;
  let popupTime = newCard.querySelector(`.popup__text--time`);
  popupTime.textContent = `Заезд после ${arrEl.offer.checkin}, выезд до ${arrEl.offer.checkout}`;
  let popupFeatures = newCard.querySelector(`.popup__features`);
  popupFeatures.textContent = ``;
  popupFeatures.appendChild(renderElements(arrEl.offer.features, renderCardFeature));
  let popupDescription = newCard.querySelector(`.popup__description`);
  popupDescription.textContent = arrEl.offer.description;
  let popupPhotos = newCard.querySelector(`.popup__photos`);
  popupPhotos.textContent = ``;
  popupPhotos.appendChild(renderElements(arrEl.offer.photos, renderPhoto));
  return newCard;
};

MAP.insertBefore(renderCard(adsArr[0]), MAP_FILTERS_CONTAINER);
