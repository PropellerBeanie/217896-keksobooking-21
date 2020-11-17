'use strict';

// data.js — модуль, который создаёт данные;
(function () {
  const HOUSING_TYPES = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const CHECK_IN_OUT_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PIN_NUM = 8;
  let fieldWidth = window.main.MAP.offsetWidth;

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
    let locationY = getRandomNum(window.main.LOCATION_Y.MIN, window.main.LOCATION_Y.MAX);
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
        guests: getRandomNum(0, 3),
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

  window.data = {
    adsArr: getAdsArr()
  };
})();

