const defaults = {
  mapCenter: { lat: 59.956719, lng: 30.330409 },
  mapStyles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e9e9e9'
        },
        {
          lightness: 17
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 17
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 29
        },
        {
          weight: 0.2
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 18
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 16
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on'
        },
        {
          color: '#ffffff'
        },
        {
          lightness: 16
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36
        },
        {
          color: '#333333'
        },
        {
          lightness: 40
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2'
        },
        {
          lightness: 19
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe'
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#fefefe'
        },
        {
          lightness: 17
        },
        {
          weight: 1.2
        }
      ]
    }
  ],
  url: '../img/map-icon.png',
  zoom: 12,
  disableDefaultUI: true,
  zoomControl: false,
  scrollwheel: true
};

export default class Map {
  constructor({
    center = defaults.mapCenter,
    mapStyles = defaults.mapStyles,
    disableDefaultUI = defaults.disableDefaultUI,
    zoomControl = defaults.zoomControl,
    scrollwheel = defaults.scrollwheel,
    zoom = defaults.zoom,
    map = ''
  }) {
    this.mapSettings = {
      center,
      disableDefaultUI,
      zoomControl,
      scrollwheel,
      zoom
    };
    this.mapStyles = mapStyles;
    this.markers = [];
    this.circles = [];
    this.bounds = new window.google.maps.LatLngBounds();

    this.createMap(map);
  }

  getMap() {
    return this.map;
  }

  getMarkers() {
    return this.markers;
  }

  overlay() {
    const myoverlay = new window.google.maps.OverlayView();
    myoverlay.draw = function drawOverlay() {
      this.getPanes().markerLayer.id = 'markerLayer';
    };
    myoverlay.setMap(this.map);
  }

  createMap(map) {
    if (typeof map === 'string') {
      this.mapNode = document.querySelector(map);
    } else {
      this.mapNode = map;
    }

    if (this.mapNode) {
      this.map = new window.google.maps.Map(this.mapNode, this.mapSettings);
      this.map.setOptions({ styles: this.mapStyles });

      this.overlay();
    }
  }

  createIcon = url => ({
    url
  });

  autoZoom() {
    this.map.fitBounds(this.bounds);
  }

  autoCenter() {
    this.map.panToBounds(this.bounds);
  }

  centerMap() {
    if (this.mapNode) {
      if (!this.markers.length === 1) this.autoZoom();
      this.autoCenter();
    }
  }

  createBound(marker) {
    const loc = new window.google.maps.LatLng(
      marker.position.lat(),
      marker.position.lng()
    );
    this.bounds.extend(loc);
  }

  drawRadius(radius, position) {
    const circle = new window.google.maps.Circle({
      strokeWeight: 0,
      fillColor: '#ff0000',
      fillOpacity: 0.2,
      map: this.map,
      center: position,
      radius
    });
    this.circles.push(circle);
  }

  renderMarker({ location }) {
    const { map } = this;
    const { position, icon, radius } = location;
    const createdIcon = this.createIcon(icon);

    const marker = new window.google.maps.Marker({
      map,
      position,
      optimized: false,
      icon: createdIcon,
      title: 'markerLayer'
    });

    if (radius) {
      this.drawRadius(radius, position);
    }

    this.createBound(marker);
    this.markers.push(marker);

    return marker;
  }
}
