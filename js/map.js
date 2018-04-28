'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_LEG = 22;

  window.popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  window.popupEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  var errorLoadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var fragmentPin;
  var successLoadHandler = function () {
    fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < window.ads.length; i++) {
      fragmentPin.appendChild(window.makePin(window.ads[i]));
    }
  };

  window.load(successLoadHandler, errorLoadHandler);

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
    window.mapPins.appendChild(fragmentPin);
  };

  var form = document.querySelector('.notice form');
  window.getDeactivePage = function () {
    window.map.classList.add('map--faded');
    window.adForm.classList.add('ad-form--disabled');
    window.getInputDisabled();
    form.reset();
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

  var setCurrentMainPinCoord = function () {
    var currentMainPinX = Math.floor(mainPinPosX + mainPinWidth / 2);
    var currentMainPinY = Math.floor(mainPinPosY + mainPinHeight);
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
  window.fragmentPin = fragmentPin;

})();
