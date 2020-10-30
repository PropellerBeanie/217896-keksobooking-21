'use strict';

var MAP = document.querySelector(".map");
var HOUSING_TYPES = ["palace", "flat", "house", "bungalow"];
var CHECK_IN_OUT_TIMES = ["12:00", "13:00", "14:00"];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var LOCATION_Y = {
  MIN: 130,
  MAX: 630
};
var PIN_SIZE = {
  X: 50,
  Y: 70
};
var PIN_TEMPLATE = document.querySelector("#pin").content.querySelector("button");
var PIN_IMG_TEMPLATE = PIN_TEMPLATE.querySelector("img").cloneNode();
var PIN_NUM = 8;
var fieldWidth = MAP.offsetWidth;
var mapPins = document.querySelector(".map__pins");

var getRandomNum = function getRandomNum(min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getRandomElNum = function getRandomElNum(array) {
  return getRandomNum(0, array.length - 1);
};

var getRandomElOfArr = function getRandomElOfArr(array, multiple) {
  if (multiple) {
    var start = getRandomElNum(array);
    var end = getRandomNum(start, array.length);
    return array.slice(start, end);
  } else {
    return array[getRandomElNum(array)];
  }
};

var getAdObj = function getAdObj() {
  var locationX = getRandomNum(0, fieldWidth);
  var locationY = getRandomNum(LOCATION_Y.MIN, LOCATION_Y.MAX);
  var newAdObj = {
    author: {
      avatar: "img/avatars/user0".concat(getRandomNum(1, 8), ".png")
    },
    offer: {
      title: "\u041E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 - ".concat(getRandomNum(123, 999)),
      address: "".concat(locationX, ", ").concat(locationY),
      price: getRandomNum(10, 90000),
      type: getRandomElOfArr(HOUSING_TYPES),
      rooms: getRandomNum(1, 100),
      guests: getRandomNum(1, 100),
      checkin: getRandomElOfArr(CHECK_IN_OUT_TIMES),
      checkout: getRandomElOfArr(CHECK_IN_OUT_TIMES),
      features: getRandomElOfArr(FEATURES, true),
      description: "\u041F\u043E\u0441\u0440\u0435\u0434\u043D\u0438\u043A. \u041A\u043E\u043C\u0438\u0441\u0441\u0438\u044F. \u0424\u043E\u0442\u043E \u0438\u0437 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0430. \u0412\u0441\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443. :P",
      photos: getRandomElOfArr(PHOTOS, true)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return newAdObj;
};

var getAdsArr = function getAdsArr() {
  var newArr = [];

  for (var i = 0; i < PIN_NUM; i++) {
    newArr[i] = getAdObj();
  }

  return newArr;
};

var adsArr = getAdsArr();
MAP.classList.remove("map--faded");

var renderPin = function renderPin(arrEl) {
  var newPin = PIN_TEMPLATE.cloneNode();
  var newPinImg = PIN_IMG_TEMPLATE.cloneNode();
  newPin.setAttribute("style", "left: ".concat(arrEl.location.x - PIN_SIZE.X / 2, "px; top: ").concat(arrEl.location.y - PIN_SIZE.Y, "px"));
  newPinImg.src = arrEl.author.avatar;
  newPinImg.alt = arrEl.offer.title;
  newPin.append(newPinImg);
  return newPin;
};

var renderPins = function renderPins() {
  var fragment = document.createDocumentFragment();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = adsArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arrEl = _step.value;
      fragment.appendChild(renderPin(arrEl));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return fragment;
};

mapPins.appendChild(renderPins());