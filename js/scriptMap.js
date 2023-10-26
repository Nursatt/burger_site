/*Добавление карты*/
ymaps.ready(init);
function init() {
   var myMap = new ymaps.Map("map", {
      center: [43.243770, 76.912353],
      zoom: 15
   });
   MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
   ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
         hintContent: 'Местположение',
         balloonContent: 'Мой адрес'
      }, {
         iconLayout: 'default#image',
         iconImageHref: '../images/marker.png',
         iconImageSize: [30, 29],
      })
   myMap.geoObjects
      .add(myPlacemark);
}
