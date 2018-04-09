var dataUsers = {
  number: 8;
  authors: {
    avatars: ['img/avatars/user01', 'img/avatars/user02', 'img/avatars/user03', 'img/avatars/user04',
             'img/avatars/user05', 'img/avatars/user06', 'img/avatars/user07', 'img/avatars/user08'],
  },
  offer: {
    title: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
    ],
    address: ['120, 180', '210, 150', '290, 320', '500, 120', '650, 540', '550, 600', '500, 500', '450, 650'],
    price: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: [1, 2, 3, 4, 5],
    guests: [2, 4, 6, 8, 10, 12, 14, 16],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: '',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  },
location: {
    x: [300, 400, 500, 550, 600, 700, 800, 900],
    y: [150, 200, 250, 300, 350, 400, 450, 500]
};

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var similarListElement = userDialog.querySelector('.map__pins');
var similarUserTemplate = document.querySelector('.map__card')
    .content
    .querySelector('.map__pin');

    var renderUser = function (user) {
      var userElement = similarUserTemplate.cloneNode(true);
      userElement.querySelector('.popup__avatar').src = user.author.avatar;
      return userElement;
    };

var getRandomElement = function (array) {
    for (var i = 0; i < array.length; i++) {
        var randomIndex = Math.floor(Math.random() * array.length);
        var randomElement = array[randomIndex];
      }
      return randomElement;
    };

    var createUsers = function () {
      var users = [];
      for (var i = 0; i < dataUsers.number; i++) {
        users.push({
          avatar: getRandomElement(dataUsers.authors.avatars),
        });
      }
      return users;
    };

    function renderUsers() {
      var similarUsers = createUsers();
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < similarUsers.length; i++) {
        fragment.appendChild(renderUser(similarUsers[i]));
      }
      similarListElement.appendChild(fragment);
    }

    renderUsers();

    userDialog.querySelector('.map').classList.remove('map--faded');
