'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ProvinceData {
  name: string;
  winner: string;
  color: string;
  percentages: { [key: string]: number };
}

interface LeafletMapProps {
  provincesData: ProvinceData[];
  onProvinceClick: (province: ProvinceData) => void;
}

export function LeafletMap({ provincesData, onProvinceClick }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Inicializar mapa
    const map = L.map(mapContainerRef.current).setView([-38.4161, -63.6167], 5);
    mapRef.current = map;

    // Capa base oscura
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Cargar GeoJSON
    fetch('/provincias-argentina.geojson')
      .then(response => response.json())
      .then(geojson => {
        const datosPoRegion: { [key: string]: ProvinceData } = {};
        provincesData.forEach(d => {
          datosPoRegion[d.name.toLowerCase()] = d;
          // Agregar variantes de nombres
          if (d.name === 'Cordoba') datosPoRegion['córdoba'] = d;
          if (d.name === 'Neuquen') datosPoRegion['neuquén'] = d;
          if (d.name === 'Rio Negro') datosPoRegion['río negro'] = d;
          if (d.name === 'Tucuman') datosPoRegion['tucumán'] = d;
        });

        function styleProvincias(feature: any) {
          const nombreProvincia = (feature.properties.nombre || feature.properties.name || '').toLowerCase();
          const datos = datosPoRegion[nombreProvincia];

          return {
            fillColor: datos ? datos.color : '#64748b',
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: datos ? 0.7 : 0.3
          };
        }

        function onEachFeature(feature: any, layer: any) {
          const nombreProvincia = (feature.properties.nombre || feature.properties.name || '').toLowerCase();
          const datos = datosPoRegion[nombreProvincia];

          if (datos) {
            const percentagesList = Object.entries(datos.percentages)
              .map(([party, percentage]) => `<p style="margin: 3px 0;"><strong>${party}:</strong> ${percentage}%</p>`)
              .join('');

            layer.bindPopup(`
              <div style="font-family: Arial; color: #333; min-width: 200px;">
                <h4 style="margin: 0 0 10px 0; color: ${datos.color}; font-size: 16px;">${datos.name}</h4>
                <p style="margin: 5px 0;"><strong>Ganador:</strong> <span style="color: ${datos.color}">${datos.winner}</span></p>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd;">
                  ${percentagesList}
                </div>
              </div>
            `);
          } else {
            layer.bindPopup(`
              <div style="font-family: Arial; color: #333;">
                <h4 style="margin: 0;">${feature.properties.nombre || feature.properties.name}</h4>
                <p>Sin datos disponibles</p>
              </div>
            `);
          }

          layer.on({
            mouseover: function(e: any) {
              const layer = e.target;
              layer.setStyle({
                weight: 4,
                fillOpacity: 0.9
              });
              layer.bringToFront();
            },
            mouseout: function(e: any) {
              geoJsonLayer.resetStyle(e.target);
            },
            click: function() {
              if (datos) {
                onProvinceClick(datos);
              }
            }
          });
        }

        const geoJsonLayer = L.geoJSON(geojson, {
          style: styleProvincias,
          onEachFeature: onEachFeature
        }).addTo(map);

        // Leyenda
        const legend = L.control({ position: 'bottomright' });

        legend.onAdd = function() {
          const div = L.DomUtil.create('div', 'info legend');
          div.style.background = 'rgba(0, 0, 0, 0.8)';
          div.style.padding = '12px';
          div.style.borderRadius = '8px';
          div.style.color = '#fff';

          const partidosUnicos = [...new Set(provincesData.map(d => d.winner))];

          div.innerHTML = '<h6 style="margin: 0 0 10px 0; font-size: 14px;"><strong>Partidos</strong></h6>';

          partidosUnicos.forEach(partido => {
            const provincia = provincesData.find(p => p.winner === partido);
            if (provincia) {
              div.innerHTML += `
                <div style="margin: 5px 0; display: flex; align-items: center;">
                  <span style="display: inline-block; width: 20px; height: 20px; background: ${provincia.color}; margin-right: 8px; border-radius: 3px;"></span>
                  <span style="font-size: 13px;">${partido}</span>
                </div>
              `;
            }
          });

          return div;
        };

        legend.addTo(map);
      })
      .catch(error => {
        console.error('Error cargando GeoJSON:', error);
      });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [provincesData, onProvinceClick]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-white/20"
      style={{ zIndex: 1 }}
    />
  );
}
