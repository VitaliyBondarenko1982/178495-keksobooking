'use strict';


(function () {
  var housingType = document.querySelector('#housing-type');
  var selectedType;

  housingType.addEventListener('change', function () {
    var selectedTypeValue = housingType.value;
    window.makeCard.offer.type = selectedTypeValue;
    selectedType = selectedTypeValue;
    updateAds();
  });

  var updateAds = function () {
    var sameTypeAds = window.ads.filter(function (it) {
      return it.offer.type === selectedType;
    });
    window.map.renderPins(sameTypeAds.concat(window.ads));
  };

})();
