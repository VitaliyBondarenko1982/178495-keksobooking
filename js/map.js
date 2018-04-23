'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAIN_PIN_LEG = 22;

  window.popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < window.ads.length; i++) {
    fragmentPin.appendChild(window.makePin(window.ads[i]));
  }

  var mapPins = document.querySelector('.map__pins');
  var inputAddress = document.getElementById('address');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.querySelector('img').width;
  var mainPinHeight = mainPin.querySelector('img').height;
  var mapWidth = document.querySelector('.map__overlay').clientWidth;
  var mapHeight = document.querySelector('.map__overlay').clientHeight;

  var setStartMainPinCoord = function () {
    var mainPinX = Math.floor(parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
    var mainPinY = Math.floor(parseInt(mainPin.style.top, 10) + mainPinHeight / 2);
    inputAddress.value = mainPinX + ', ' + mainPinY;
  };
  setStartMainPinCoord();

  var setCurrentMainPinCoord = function () {
    var currentMainPinX = Math.floor(parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
    var currentMainPinY = Math.floor(parseInt(mainPin.style.top, 10) + mainPinHeight);
    inputAddress.value = currentMainPinX + ', ' + (currentMainPinY + MAIN_PIN_LEG);
  };


  var getActivePage = function () {
    window.map.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');
    for (var k = 0; k < window.fieldsetElements.length; k++) {
      window.fieldsetElem = window.fieldsetElements[k];
      window.fieldsetElem.removeAttribute('disabled');
    }
    mapPins.appendChild(fragmentPin);
  };


  var limitMainPinMove = function (left, top) {
    if ((left < 0) || (top < 0) || (left + mainPinWidth > mapWidth) || (top + mainPinHeight > mapHeight)) {
      return true;
    }
    return false;
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
      setCurrentMainPinCoord();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      getActivePage();
      setCurrentMainPinCoord();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);


  });

  // move main pin


  // close popup

  var popupClose = document.querySelector('.popup__close');

  var closePopup = function () {
    window.elementCard.classList.add('hidden');
    document.removeEventListener('keydown', window.popupEscPressHandler);
  };

  popupClose.addEventListener('click', function () {
    closePopup();
  });

// close popup
})();
