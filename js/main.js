'use strict';

// main.js — точка входа. Модуль, который связывает другие модули;
(function () {
  window.main = {
    MAP: document.querySelector(`.map`),
    AD_FORM: document.querySelector(`.ad-form`),
    PIN_SIZE: {
      X: 50,
      Y: 70
    },
    LOCATION_Y: {
      MIN: 130,
      MAX: 630
    },
    MAP_FILTERS_CONTAINER: document.querySelector(`.map__filters-container`)
  };
  const MAP_PIN_MAIN = document.querySelector(`.map__pin--main`);
  const MAP_FILTERS = window.main.MAP_FILTERS_CONTAINER.querySelector(`.map__filters`);
  const AD_FORM = document.querySelector(`.ad-form`);
  const AD_FORM_FIELDSETS = AD_FORM.querySelectorAll(`fieldset`);
  const AD_FORM_ADDRESS = window.main.AD_FORM.querySelector(`#address`);
  let fieldWidth = window.main.MAP.offsetWidth;
  let mapPins = document.querySelector(`.map__pins`);

  // inactive state

  for (let adFieldset of AD_FORM_FIELDSETS) {
    adFieldset.disabled = true;
  }
  MAP_FILTERS.disabled = true;
  AD_FORM_ADDRESS.value = `${fieldWidth / 2}, ${window.main.LOCATION_Y.MIN + (window.main.LOCATION_Y.MAX - window.main.LOCATION_Y.MIN) / 2}`;

  // activation

  let activatePage = function () {
    mapPins.appendChild(window.pin.renderPins());
    window.pin.addPinButtonsListeners(mapPins);
    window.main.MAP.classList.remove(`map--faded`);
    AD_FORM.classList.remove(`ad-form--disabled`);
    for (let adFieldset of AD_FORM_FIELDSETS) {
      adFieldset.removeAttribute(`disabled`);
    }
    MAP_FILTERS.removeAttribute(`disabled`);
  };

  let fillAdAddress = function () {
    AD_FORM_ADDRESS.value = `${MAP_PIN_MAIN.offsetLeft + window.main.PIN_SIZE.X}, ${MAP_PIN_MAIN.offsetTop + window.main.PIN_SIZE.Y}`;
  };

  MAP_PIN_MAIN.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      activatePage();
      fillAdAddress();
    }
  });

  MAP_PIN_MAIN.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  });
})();

