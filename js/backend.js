'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  window.upload = function (data, onLoad, onError) {
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

    xhr.timeout = 10000; // 10s

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

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

    xhr.timeout = 10000; // 10s

    xhr.send();

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
