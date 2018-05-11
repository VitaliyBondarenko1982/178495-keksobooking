'use strict';

(function () {
  var TIMEOUT = 10000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var createRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      createRequest('GET', URL_LOAD, onLoad, onError);
    },

    upload: function (data, onLoad, onError) {
      createRequest('POST', URL_UPLOAD, onLoad, onError, data);
    }
  };

  var errorElement = document.createElement('div');
  var hideErrorMessage = function () {
    setTimeout(function () {
      errorElement.classList.add('hidden');
    }, 5000);
  };

  window.errorDataHandler = function (errorMessage) {
    errorElement.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    errorElement.style.color = '#333333';
    errorElement.style.textAlign = 'center';
    errorElement.style.margin = 'center auto';
    errorElement.style.position = 'fixed';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '35px';
    errorElement.style.zIndex = '100';
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
    hideErrorMessage();
  };

})();
