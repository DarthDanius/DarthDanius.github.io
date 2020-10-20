'use strict'

ymaps.ready(init);

// window.data.address
function init() {
    ymaps.geocode(window.data.address, {
    results: 1
  })
  .then(function (res) {
    let firstGeoObject =  res.geoObjects.get(0);
      // Выбираем первый результат геокодирования.
          // Координаты геообъекта.
          // coords = firstGeoObject.geometry.getCoordinates(),

    firstGeoObject.options.set('preset', 'islands#redIcon');
    firstGeoObject.properties.set('iconCaption', window.data.address);
    return firstGeoObject;

      // Добавляем первый найденный геообъект на карту.
      // myMap.geoObjects.add(firstGeoObject);
      // Масштабируем карту на область видимости геообъекта.
      // myMap.setBounds(bounds, {
          // Проверяем наличие тайлов на данном масштабе.
          // checkZoomRange: true
      // });
  })
  .then( 
    (res)=>{
    // console.log('res');
    // console.log(res);
    // console.log(res.geometry.getCoordinates());
    var myMap = new ymaps.Map(document.getElementById('map'), {
      center: res.geometry.getCoordinates(),
      zoom: 17,
      controls: []
    });
    return [res, myMap];
  })
  .then(
    (res)=>{
      // console.log(res);
      let bounds = res[0].properties.get('boundedBy');
      console.log(bounds);
      res[1].setBounds(bounds, {
        checkZoomRange: true
      });
      res[1].geoObjects.add(res[0]);
    }
  )









  // var myMap = new ymaps.Map(document.getElementById('map'), {
  //     center: [55.753994, 37.622093],
  //     zoom: 9
  // });

  // // Поиск координат центра Нижнего Новгорода.
  // ymaps.geocode(window.data.address, {
  //     results: 1
  // }).then(function (res) {
  //         // Выбираем первый результат геокодирования.
  //         var firstGeoObject = res.geoObjects.get(0),
  //             // Координаты геообъекта.
  //             coords = firstGeoObject.geometry.getCoordinates(),
  //             // Область видимости геообъекта.
  //             bounds = firstGeoObject.properties.get('boundedBy');

  //         firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
  //         // Получаем строку с адресом и выводим в иконке геообъекта.
  //         firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

  //         // Добавляем первый найденный геообъект на карту.
  //         myMap.geoObjects.add(firstGeoObject);
  //         // Масштабируем карту на область видимости геообъекта.
  //         myMap.setBounds(bounds, {
  //             // Проверяем наличие тайлов на данном масштабе.
  //             checkZoomRange: true
  //         });
  //   }
  // );


}