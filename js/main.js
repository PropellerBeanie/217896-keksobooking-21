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
let pinNum = 8;
let fieldWidth = MAP.offsetWidth;
let mapPins = document.querySelector(`.map__pins`);

let getRandomNum = function (min, max) {
  return (Math.floor(Math.random() * max) + min)
};

let getRandomElNum = function (array) {
  return (getRandomNum(0, array.length - 1));
};

let getRandomElOfArr = function (array, multiple) {
  if (multiple) {
    let start = getRandomElNum(array);
    let end = getRandomNum(start, array.length);
    return array.slice(start, end);
  } else {
  return array[getRandomElNum(array)];
  }
}

let getAdObj = function () {
  let newAdObj = {
    author: {
        avatar: `img/avatars/user0${getRandomNum(1,8)}.png`,
    },
    offer: {
      title: `Объявление - ${getRandomNum(123, 999)}`,
      address: `600, 350`,
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
        x: getRandomNum(0, fieldWidth),
        y: getRandomNum(LOCATION_Y.MIN, LOCATION_Y.MAX)
    }
}
return newAdObj
}

let getAdsArr = function () {
  let newArr = [];
  for (let i = 0; i < pinNum; i++) {
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
