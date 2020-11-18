'use strict';

// form.js — модуль, который работает с формой объявления.

// form validation
(function () {
  window.form = {
    fillAdAddress(adFormAddress) {
      adFormAddress.value = `${window.main.MAP_PIN_MAIN.offsetLeft + window.main.PIN_SIZE.X}, ${window.main.MAP_PIN_MAIN.offsetTop + window.main.PIN_SIZE.Y}`;
    },
    init(adForm) {
      const AD_FORM_TYPE = adForm.querySelector(`#type`);
      const AD_FORM_PRICE = adForm.querySelector(`#price`);
      const AD_FORM_TIME_IN = adForm.querySelector(`#timein`);
      const AD_FORM_TIME_OUT = adForm.querySelector(`#timeout`);
      const AD_FORM_ROOMS = adForm.querySelector(`#room_number`);
      const AD_FORM_GUESTS = adForm.querySelector(`#capacity`);
      AD_FORM_ROOMS.addEventListener(`change`, function () {
        roomsGuestsChangeHandler();
      });
      AD_FORM_GUESTS.addEventListener(`change`, function () {
        roomsGuestsChangeHandler();
      });
      AD_FORM_TYPE.addEventListener(`change`, function () {
        typePriceChangeHandler();
      });
      AD_FORM_PRICE.addEventListener(`change`, function () {
        typePriceChangeHandler();
      });
      AD_FORM_TIME_IN.addEventListener(`change`, function (evt) {
        timeInOutChangeHandler(evt.target.id);
      });
      AD_FORM_TIME_OUT.addEventListener(`change`, function (evt) {
        timeInOutChangeHandler(evt.target.id);
      });

      let roomsGuestsChangeHandler = function () {
        let roomsValue = parseInt(AD_FORM_ROOMS.value, 10);
        let guestsValue = parseInt(AD_FORM_GUESTS.value, 10);
        if (roomsValue === 1 && guestsValue !== 1) {
          AD_FORM_GUESTS.setCustomValidity(`В одной комнате может быть только 1 гость`);
        } else if (roomsValue === 2 && (guestsValue < 1 || guestsValue > 2)) {
          AD_FORM_GUESTS.setCustomValidity(`2 комнаты - от 1 до 2 гостей`);
        } else if (roomsValue === 3 && (guestsValue < 1 || guestsValue > 3)) {
          AD_FORM_GUESTS.setCustomValidity(`3 комнаты - 3 гостя`);
        } else if (roomsValue === 100 && guestsValue !== 0) {
          AD_FORM_GUESTS.setCustomValidity(`В cта комнатах не может быть гостей`);
        } else {
          AD_FORM_GUESTS.setCustomValidity(``);
        }
        AD_FORM_GUESTS.reportValidity();
      };

      let typePriceChangeHandler = function () {
        let typeValue = AD_FORM_TYPE.value;
        let priceValue = parseInt(AD_FORM_PRICE.value, 10);
        if (typeValue === `bungalow`) {
          AD_FORM_PRICE.placeholder = `0`;
          AD_FORM_PRICE.min = `0`;
        } else if (typeValue === `flat`) {
          if (priceValue < 1000) {
            AD_FORM_PRICE.setCustomValidity(`Квартира - минимальная цена за ночь 1 000`);
          }
          AD_FORM_PRICE.placeholder = `1000`;
          AD_FORM_PRICE.min = `1000`;
        } else if (typeValue === `house`) {
          if (priceValue < 5000) {
            AD_FORM_PRICE.setCustomValidity(`Дом - минимальная цена за ночь 5 000`);
          }
          AD_FORM_PRICE.placeholder = `5000`;
          AD_FORM_PRICE.min = `5000`;
        } else if (typeValue === `palace`) {
          if (priceValue < 10000) {
            AD_FORM_PRICE.setCustomValidity(`Дворец - минимальная цена за ночь 10 000`);
          }
          AD_FORM_PRICE.placeholder = `10000`;
          AD_FORM_PRICE.min = `10000`;
        } else {
          AD_FORM_GUESTS.setCustomValidity(``);
        }
        if (priceValue) {
          AD_FORM_PRICE.reportValidity();
        }
      };

      let timeInOutChangeHandler = function (id) {
        let timeInValue = AD_FORM_TIME_IN.value;
        let timeOutValue = AD_FORM_TIME_OUT.value;
        if (timeInValue !== timeOutValue) {
          if (id === `timein`) {
            AD_FORM_TIME_OUT.value = timeInValue;
          } else {
            AD_FORM_TIME_IN.value = timeOutValue;
          }
        }
      };
    }
  };


})();
