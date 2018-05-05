'use strict';

(function () {

  var lastTimeout;

  window.utils = {
    debounce: function (fun) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(fun, window.utils.DEBOUNCE_INTERVAL);
    },
    DEBOUNCE_INTERVAL: 500
  };

})();
