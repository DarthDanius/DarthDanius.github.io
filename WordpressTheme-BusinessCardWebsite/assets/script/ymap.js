'use strict'

ymaps.ready(init);

function init() {
    ymaps.geocode(window.data.address, {
    results: 1
  })
  .then(function (res) {
    let firstGeoObject =  res.geoObjects.get(0);
    firstGeoObject.options.set('preset', 'islands#redIcon');
    firstGeoObject.properties.set('iconCaption', window.data.address);
    return firstGeoObject;
  })
  .then( 
    (res)=>{
    var myMap = new ymaps.Map(document.getElementById('map'), {
      center: res.geometry.getCoordinates(),
      zoom: 17,
      controls: []
    });
    return [res, myMap];
  })
  .then(
    (res)=>{
      let bounds = res[0].properties.get('boundedBy');
      res[1].setBounds(bounds, {
        checkZoomRange: true
      });
      res[1].geoObjects.add(res[0]);
      return res;
    }
  )
  .then(
    (res)=>{
      let link = document.querySelector('#address_link');
      let coord = res[0].geometry.getCoordinates();
      if (link) {
        link.setAttribute('href', `https://yandex.ru/maps/?rtext=~${coord[0]}%2C${coord[1]}`);
      }
      // <a href="https://yandex.ru/maps/?rtext=~55.733836%2C37.588134">Построить маршрут</a>
    }
  )
}