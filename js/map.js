'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_LEG = 22;

  var fragmentPin;

  window.renderPins = function () {
    fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < window.ads.length; i++) {
      fragmentPin.appendChild(window.makePin(window.ads[i]));
    }
    window.mapPins.appendChild(fragmentPin);
  };

  var successLoadHandler = function (data) {
    window.ads = data;
    window.renderPins(data);
  };

  // window.load(successLoadHandler, window.errorDataHandler);

  window.mapPins = document.querySelector('.map__pins');
  var inputAddress = document.getElementById('address');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.querySelector('img').width;
  var mainPinHeight = mainPin.querySelector('img').height;
  var mapWidth = document.querySelector('.map__overlay').clientWidth;
  var mapHeight = document.querySelector('.map__overlay').clientHeight;


  var getActivePage = function () {
    window.map.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');
    for (var k = 0; k < window.fieldsetElements.length; k++) {
      window.fieldsetElem = window.fieldsetElements[k];
      window.fieldsetElem.removeAttribute('disabled');
    }
    window.load(successLoadHandler, window.errorDataHandler);
    window.selectRoomNumber.children[0].selected = true;
    window.selectCapacity.children[0].selected = false;
  };

  var form = document.querySelector('.notice form');


  window.getDeactivePage = function () {
    window.map.classList.add('map--faded');
    window.adForm.classList.add('ad-form--disabled');
    window.getInputDisabled();
    form.reset();
    var elements = document.querySelectorAll('.user__pin');
    window.clearMap = function () {
      elements.forEach(function (node) {
        node.parentNode.removeChild(node);
      });
    };
    window.clearMap();
    mainPin.style.left = mainPinPosX + 'px';
    mainPin.style.top = mainPinPosY + 'px';
    inputAddress.value = mainPinX + ', ' + mainPinY;
    window.elementCard.classList.add('hidden');
  };

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
