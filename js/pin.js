'use strict';

// pin.js — модуль, который отвечает за создание метки на карте;
(function () {
  const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`button`);
  const PIN_IMG_TEMPLATE = PIN_TEMPLATE.querySelector(`img`).cloneNode();

  let renderPin = function (arrEl) {
    let newPin = PIN_TEMPLATE.cloneNode();
    let newPinImg = PIN_IMG_TEMPLATE.cloneNode();
    newPin.setAttribute(`style`, `left: ${arrEl.location.x - window.main.PIN_SIZE.X / 2}px; top: ${arrEl.location.y - window.main.PIN_SIZE.Y}px`);
    newPin.setAttribute(`tabindex`, `0`);
    newPin.dataset.id = arrEl.offer.title;
    newPinImg.src = arrEl.author.avatar;
    newPinImg.alt = arrEl.offer.title;
    newPin.append(newPinImg);
    return newPin;
  };

  window.pin = {
    renderPins() {
      let fragment = document.createDocumentFragment();
      for (let arrEl of window.data.adsArr) {
        fragment.appendChild(renderPin(arrEl));
      }
      return fragment;
    },
    addPinButtonsListeners(mapPinsList) {
      let adPinBtns = mapPinsList.querySelectorAll(`[data-id]`);
      for (let btn of adPinBtns) {
        btn.addEventListener(`mousedown`, function (evt) {
          window.card.openAdPopup(evt.currentTarget);
        });
        btn.addEventListener(`keydown`, function (evt) {
          if (evt.key === `Enter`) {
            window.card.openAdPopup(evt.currentTarget);
          }
        });
      }
    }
  };
})();
