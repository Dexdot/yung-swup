import Map from '../components/map';

$(window).on('load', () => {
  // Дефолтные значение
  const defaultPoints = [
    {
      position: { lat: 59.956719, lng: 30.330409 },
      icon: 'img/map-icon.png'
    }
  ];
  const locations = window.Points ? window.Points : defaultPoints;

  // Выходим, если нет контейнера для карты
  if (!document.querySelector('.map')) return false;

  // Инитим
  const map = new Map({ map: '.map' });

  // Рисуем маркеры
  $(locations).each((i, location) => {
    map.renderMarker({
      location
    });
  });

  // Центруем, зумим
  if (locations.length > 1) {
    map.centerMap();
  } else if (locations.length === 1) {
    const createdMap = map.getMap();
    createdMap.setCenter(locations[0].position);
    createdMap.setZoom(13);
  }
});
