function initializeInteractiveMap(chapterData, statesData) {
  function initializeMap() {
    if (typeof L === 'undefined') {
      setTimeout(initializeMap, 50);
      return;
    }

    const map = L.map('interactive-map', {
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true,
      attributionControl: false
    }).setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&#169; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &#169; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(map);

    function getStateColor(stateName) {
      if (statesData.current.includes(stateName)) {
        return statesData.colors.current;
      }
      return statesData.colors.expansion;
    }

    function getStateOpacity(stateName) {
      if (statesData.current.includes(stateName)) {
        return 0.7;
      }

      return 0.5;
    }

    function style(feature) {
      const stateName = feature.properties.NAME || feature.properties.name || feature.properties.NAME_1 || feature.properties.state_name;
      return {
        fillColor: getStateColor(stateName),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: getStateOpacity(stateName)
      };
    }

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 4,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.8
      });

      layer.bringToFront();

      info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }

    var info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this._div.className = 'px-2 py-1.5 text-sm leading-4 font-sans bg-white/80 shadow-lg rounded-md md:text-base md:px-3 md:py-2';
      this.update();
      return this._div;
    };

    info.update = function (props) {
      var status = '';
      var stateName = '';
      if (props) {
        stateName = props.NAME || props.name || props.NAME_1 || props.state_name || 'Unknown State';
        if (statesData.current.includes(stateName)) {
          status = ' - <span style="color: ' + statesData.colors.current + '; font-weight: bold;">Active State</span>';
        } else {
          status = ' - <span style="color: ' + statesData.colors.expansion + '; font-weight: bold;">Expansion Target</span>';
        }
        this._div.innerHTML = (props ? '<b>' + stateName + '</b>' + status : '');
      }

    };

    info.addTo(map);

    var geojson;

    fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
      .then(response => response.json())
      .then(data => {
        geojson = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature
        }).addTo(map);
      })
      .catch(error => {
        console.error('Error loading state boundaries:', error);
      });

    const chapterIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path fill="${statesData.colors.current}" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
          <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
        </svg>
      `),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    chapterData.forEach(chapter => {
      if (chapter.lat && chapter.lng) {
        const marker = L.marker([chapter.lat, chapter.lng], { icon: chapterIcon })
          .addTo(map);

        const popupContent = `
          <div class="p-3 max-w-xs">
            <h3 class="font-bold text-lg text-bot-blue mb-2">${chapter.name}</h3>
            <div class="h-px my-2 bg-gray-200 mb-2"></div>
            <div class="text-sm font-medium text-gray-600 mb-2">Volunteer Links:</div>
            ${chapter.links.map(link => `<a href="${link.url}" class="text-bot-blue">${link.name}</a>`).join('')}
          </div>
        `;

        marker.bindPopup(popupContent);
      }
    });

    function resizeMap() {
      map.invalidateSize();
    }

    window.addEventListener('resize', resizeMap);

    setTimeout(resizeMap, 100);
  }

  document.documentElement.style.setProperty('--current-color', statesData.colors.current);
  document.documentElement.style.setProperty('--expansion-color', statesData.colors.expansion);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMap);
  } else {
    initializeMap();
  }
}

// Make the function available globally
window.initializeInteractiveMap = initializeInteractiveMap;
