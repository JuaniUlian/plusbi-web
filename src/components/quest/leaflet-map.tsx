
'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapContainerRef.current || mapRef.current) return;

    // Importar Leaflet dinámicamente solo en el cliente
    import('leaflet').then((L) => {
      if (!mapContainerRef.current || mapRef.current) return;

      try {
        // Inicializar mapa
        const map = L.map(mapContainerRef.current, {
          center: [-38.4161, -63.6167],
          zoom: 4,
          zoomControl: true,
          scrollWheelZoom: false,
        });
        mapRef.current = map;

        // Capa base oscura
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);

        // Cargar GeoJSON
        fetch('/provincias-argentina.geojson')
          .then(response => response.json())
          .then(geojson => {
            const datosPoRegion: { [key: string]: ProvinceData } = {};
            provincesData.forEach(d => {
              const normalizedName = d.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              datosPoRegion[normalizedName] = d;

              // Mapeos manuales para casos especiales
              if (normalizedName === "caba") datosPoRegion["ciudad autonoma de buenos aires"] = d;
              if (normalizedName === "buenos aires") datosPoRegion["buenos aires"] = d;
            });

            function getProvinceData(geoName: string): ProvinceData | undefined {
                const normalizedGeoName = geoName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                return datosPoRegion[normalizedGeoName];
            }


            function styleProvincias(feature: any) {
              const nombreProvincia = (feature.properties.nombre || feature.properties.name || '').toLowerCase();
              const datos = getProvinceData(nombreProvincia);

              return {
                fillColor: datos ? datos.color : '#64748b',
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: datos ? 0.75 : 0.3
              };
            }

            function onEachFeature(feature: any, layer: any) {
              const nombreProvincia = (feature.properties.nombre || feature.properties.name || '');
              const datos = getProvinceData(nombreProvincia);

              if (datos) {
                const percentagesList = Object.entries(datos.percentages)
                  .map(([party, percentage]) => `<p style="margin: 3px 0;"><strong>${party}:</strong> ${percentage}%</p>`)
                  .join('');

                const popupContent = `
                  <div style="font-family: 'Nunito', sans-serif; color: #333; min-width: 180px;">
                    <h4 style="margin: 0 0 10px 0; color: ${datos.color}; font-size: 16px; font-weight: bold;">${datos.name}</h4>
                    <p style="margin: 5px 0;"><strong>Ganador:</strong> <span style="color: ${datos.color}; font-weight: 600;">${datos.winner}</span></p>
                    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd;">
                      ${percentagesList}
                    </div>
                  </div>
                `;
                layer.bindPopup(popupContent);
              } else {
                layer.bindPopup(`
                  <div style="font-family: 'Nunito', sans-serif; color: #333;">
                    <h4 style="margin: 0; font-weight: bold;">${nombreProvincia}</h4>
                    <p>Sin datos disponibles</p>
                  </div>
                `);
              }

              layer.on({
                mouseover: function(e: any) {
                  const layer = e.target;
                  layer.setStyle({
                    weight: 3,
                    color: '#fff',
                    fillOpacity: 0.9
                  });
                  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                  }
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
              div.style.background = 'rgba(23, 23, 23, 0.8)';
              div.style.padding = '10px 15px';
              div.style.borderRadius = '8px';
              div.style.color = '#fff';
              div.style.border = '1px solid #444';
              div.style.backdropFilter = 'blur(5px)';

              const partidos = [
                  { name: 'LLA', color: '#7c3aed' },
                  { name: 'FP', color: '#3b82f6' },
                  { name: 'PU', color: '#f97316' },
                  { name: 'Provincial', color: '#f59e0b' },
                  { name: 'Sin datos', color: '#64748b' }
              ];

              div.innerHTML = '<h6 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">Partidos</h6>';

              partidos.forEach(partido => {
                  div.innerHTML += `
                    <div style="margin: 5px 0; display: flex; align-items: center;">
                      <span style="display: inline-block; width: 18px; height: 18px; background: ${partido.color}; margin-right: 8px; border-radius: 3px;"></span>
                      <span style="font-size: 13px;">${partido.name}</span>
                    </div>
                  `;
              });

              return div;
            };

            legend.addTo(map);
          })
          .catch(error => {
            console.error('Error cargando GeoJSON:', error);
          });
      } catch (error) {
        console.error('Error inicializando mapa:', error);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mounted, provincesData, onProvinceClick]);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-white/20 flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin=""/>
      <div
        ref={mapContainerRef}
        className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-white/20"
        style={{ zIndex: 1 }}
      />
    </>
  );
}
