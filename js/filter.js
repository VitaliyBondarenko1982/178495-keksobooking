'use strict';


(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFilters = document.querySelector('.map__filters');

  var MIN_MIDDLE_PRICE = 10000;
  var MAX_MIDDLE_PRICE = 50000;
  var MIN_FILTER_PINS = 0;
  var MAX_FILTER_PINS = 5;

  var filterFieldsCheck = function (it) {

    if (housingType !== 'any') {
      if (it.offer.type !== housingType) {
        return false;
      }
    }

    if (housingPrice !== 'any') {
      if (housingPrice === 'low' && it.offer.price >= MIN_MIDDLE_PRICE) {
        return false;
      } else if (housingPrice === 'middle' && (it.offer.price < MIN_MIDDLE_PRICE || it.offer.price > MAX_MIDDLE_PRICE)) {
        return false;
      } else if (housingPrice === 'high' && it.offer.price < MAX_MIDDLE_PRICE) {
        return false;
      }
    }

    if (housingRooms !== 'any') {
      if (it.offer.rooms !== parseInt(housingRooms, 10)) {
        return false;
      }
    }

    if (housingGuests !== 'any') {
      if (it.offer.guests !== parseInt(housingGuests, 10)) {
        return false;
      }
    }

    for (var i = 0; i < window.data.FEATURES.length; i++) {
      var feature = window.data.FEATURES[i];
      var elementFeature = document.querySelector('#filter-' + feature);
      if (elementFeature.checked) {
        if (!it.offer.features.includes(elementFeature.value)) {
          return false;
        }
      }
    }
    return true;
  };

  window.updatePins = function (arr) {
    window.clearMap();
    window.elementCard.classList.add('hidden');
    window.renderPins(arr.slice(MIN_FILTER_PINS, MAX_FILTER_PINS));
  };

  var filteredPins = function () {
    window.newAds = [];
    var newPins = window.newAds.filter(function (it) {
      return filterFieldsCheck(it);
    });
    window.updatePins(newPins);
  };

  mapFilters.addEventListener('change', function () {
    window.debounce(filteredPins);
  });
})();
