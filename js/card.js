'use strict';

// card.js — модуль, который отвечает за создание карточки объявлений;

(function () {
  const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`article`);
  const HOUSING_TYPES = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

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

  let onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      window.card.deleteCard();
    }
  };

  let addPopupCloseListeners = function (closeBtn) {
    closeBtn.addEventListener(`mouseup`, function (evt) {
      if (evt.button === 0) {
        window.card.deleteCard();
      }
    });
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  window.card = {
    renderCard(arrEl) {
      let newCard = CARD_TEMPLATE.cloneNode(true);
      let popupClose = newCard.querySelector(`.popup__close`);
      popupClose.setAttribute(`tabindex`, `0`);
      addPopupCloseListeners(popupClose);
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
    },
    deleteCard() {
      let adCard = window.main.MAP.querySelector(`.map__card`);
      if (adCard) {
        adCard.parentElement.removeChild(adCard);
        document.removeEventListener(`keydown`, onPopupEscPress);
      }
    },
    openAdPopup(el) {
      window.card.deleteCard();
      for (let adObj of window.data.adsArr) {
        if (adObj.offer.title === el.dataset.id) {
          window.main.MAP.insertBefore(window.card.renderCard(adObj), window.main.MAP_FILTERS_CONTAINER);
          break;
        }
      }
    }
  };
})();
