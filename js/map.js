'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_LEG = 22;

  var fragmentPin;
  var inputAddress = document.getElementById('address');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.querySelector('img').width;
  var mainPinHeight = mainPin.querySelector('img').height;
  var mapWidth = document.querySelector('.map__overlay').clientWidth;
  var mapHeight = document.querySelector('.map__overlay').clientHeight;
  var fieldsetElements = window.form.adForm.querySelectorAll('.ad-form fieldset');
  var form = document.querySelector('.notice form');

  window.map = {
    renderPins: function () {
      fragmentPin = document.createDocumentFragment();
      for (var i = 0; i < window.ads.length; i++) {
        fragmentPin.appendChild(window.pin.makePin(window.ads[i]));
      }
      window.map.mapPins.appendChild(fragmentPin);
    },

    // function for deactivate page
    getDeactivePage: function () {
      window.pin.mapElement.classList.add('map--faded');
      window.form.adForm.classList.add('ad-form--disabled');
      fieldsetElements.forEach(function (item) {
        item.setAttribute('disabled', true);
      });
      form.reset();
      var elements = document.querySelectorAll('.user__pin');
      elements.forEach(function (node) {
        node.parentNode.removeChild(node);
      });
      mainPin.style.left = mainPinPosX + 'px';
      mainPin.style.top = mainPinPosY + 'px';
      inputAddress.value = mainPinX + ', ' + mainPinY;
      window.elementCard.classList.add('hidden');
    },
    // function for deactivate page

    mapPins: document.querySelector('.map__pins')
  };

  window.ads = [];
  var successLoadHandler = function (data) {
    window.ads = data;
    window.map.renderPins(window.ads);
  };

  // activate fieldsets fieldsetElements
  var getActiveFieldsets = function () {
    window.form.adForm.classList.remove('ad-form--disabled');
    fieldsetElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
  // activate fieldsets fieldsetElements

  // function for activate page
  var getActivePage = function () {
    window.pin.mapElement.classList.remove('map--faded');
    getActiveFieldsets();
    window.load(successLoadHandler, window.errorDataHandler);
  };
  // function for activate page

  // move main pin
  var limitMainPinMove = function (left, top) {
    if ((left < 0) || (top < 0) || (left + mainPinWidth > mapWidth) || (top + mainPinHeight > mapHeight)) {
      return true;
    }
    return false;
  };

  var mainPinPosX = mainPin.offsetLeft;
  var mainPinPosY = mainPin.offsetTop;
  var mainPinX = Math.floor(mainPinPosX + mainPinWidth / 2);
  var mainPinY = Math.floor(mainPinPosY + mainPinHeight / 2);
  inputAddress.value = mainPinX + ', ' + mainPinY;

  window.setCurrentMainPinCoord = function () {
    var currentMainPinX = Math.floor(parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
    var currentMainPinY = Math.floor(parseInt(mainPin.style.top, 10) + mainPinHeight);
    inputAddress.value = currentMainPinX + ', ' + (currentMainPinY + MAIN_PIN_LEG);
  };


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (limitMainPinMove(mainPin.offsetLeft - shift.x, mainPin.offsetTop - shift.y)) {
        return;
      }
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      window.setCurrentMainPinCoord();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      getActivePage();
      window.setCurrentMainPinCoord();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);


  });
  // move main pin

  // close popup
  var popupClose = document.querySelector('.popup__close');

  window.popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  window.popupEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  var closePopup = function () {
    window.elementCard.classList.add('hidden');
    document.removeEventListener('keydown', window.popupEscPressHandler);
  };

  var openPopup = function () {
    window.elementCard.classList.add('hidden');
    document.addEventListener('keydown', window.popupEscPressHandler);
  };

  popupClose.addEventListener('click', function () {
    closePopup();
  });
  // close popup

  window.fragmentPin = fragmentPin;

})();
