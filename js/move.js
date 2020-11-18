'use strict';
(function () {
  window.move = {
    startPinMove(evt, adFormAddress) {
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      let onMouseMove = function (moveEvt) {
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let isWithinMap = function () {
          return ((startCoords.x > window.main.MAP.offsetLeft && startCoords.x < (window.main.MAP.offsetLeft + window.main.MAP.offsetWidth) && startCoords.y > window.main.LOCATION_Y.MIN && startCoords.y < window.main.LOCATION_Y.MAX) ? true : false);
        };

        if (isWithinMap()) {
          window.main.MAP_PIN_MAIN.style.top = (window.main.MAP_PIN_MAIN.offsetTop - shift.y) + `px`;
          window.main.MAP_PIN_MAIN.style.left = (window.main.MAP_PIN_MAIN.offsetLeft - shift.x) + `px`;
          window.form.fillAdAddress(adFormAddress);
        }
      };
      let onMouseUp = function () {
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };

})();
