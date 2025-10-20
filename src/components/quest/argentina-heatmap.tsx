
'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import type { ProvinceData } from '@/app/products/quest/dashboard/page';
import { getProvincialPartyShortName } from '@/lib/provincial-parties';

const ARGENTINA_GEOJSON = '/data/argentina-provinces.json';

interface ArgentinaHeatmapProps {
  provincesData: ProvinceData[];
  onProvinceClick: (province: ProvinceData) => void;
}

export function ArgentinaHeatmap({ provincesData, onProvinceClick }: ArgentinaHeatmapProps) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([-64, -38]);

  const handleZoomIn = () => {
    if (zoom < 4) setZoom(zoom + 0.5);
  };

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.5);
  };

  const handleReset = () => {
    setZoom(1);
    setCenter([-64, -38]);
  };

  const normalizeName = (name: string) => {
    const cleanedName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

    if (cleanedName.includes('tierra del fuego')) {
      return 'tierra del fuego';
    }
    return cleanedName;
  };

  const getProvinceData = (geoName: string): ProvinceData | undefined => {
    const normalizedGeoName = normalizeName(geoName);

    const nameMappings: { [key: string]: string } = {
      'ciudad de buenos aires': 'caba',
      'ciudad autonoma de buenos aires': 'caba',
      'buenos aires': 'buenos aires',
    };

    const mappedGeoName = nameMappings[normalizedGeoName] || normalizedGeoName;

    return provincesData.find((p) => {
      const normalizedDataName = normalizeName(p.name.toLowerCase());
      return normalizedDataName === mappedGeoName;
    });
  };

  const getTooltipContent = (province: ProvinceData) => {
    const provincialPartyName = getProvincialPartyShortName(province.name);

    const percentages = Object.entries(province.percentages)
      .sort((a, b) => b[1] - a[1])
      .map(([party, value]) => {
        const displayName = party === 'Provincial' ? provincialPartyName : party;
        return `<div class="flex justify-between"><span>${displayName}:</span> <strong>${value}%</strong></div>`;
      })
      .join('');

    return `
      <div class="text-left min-w-[280px]">
        <h3 class="font-bold text-lg mb-3 pb-2 border-b">${province.name}</h3>
        <div class="space-y-3">
          <div class="space-y-1 text-sm">${percentages}</div>
          <div class="pt-2 border-t text-xs text-muted-foreground space-y-1">
            <div><strong>Encuestadoras:</strong> ${province.pollsterCount || 0}</div>
            <div><strong>Muestra total:</strong> ${(province.totalSample || 0).toLocaleString('es-AR')} personas</div>
            ${province.pollsters && province.pollsters.length > 0 ? `<div class="text-[10px] mt-1 opacity-75">${province.pollsters.join(', ')}</div>` : ''}
          </div>
          <div class="pt-2 text-center text-xs font-medium text-primary">
            Haz clic en la provincia para generar el informe completo
          </div>
        </div>
      </div>
    `;
  };

  return (
    <div className="relative w-full h-full min-h-[600px]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [-64, -38],
        }}
        className="w-full h-full"
        data-tooltip-id="province-tooltip"
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={(position) => setCenter(position.coordinates)}
        >
          <Geographies geography={ARGENTINA_GEOJSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceData = getProvinceData(geo.properties.NAME_1);
              const fillColor = provinceData?.color || '#e5e7eb';
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: fillColor,
                      fillOpacity: 0.9,
                      stroke: '#fff',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    hover: {
                      fill: fillColor,
                      fillOpacity: 1,
                      stroke: '#333',
                      strokeWidth: 1.5,
                      outline: 'none',
                      cursor: 'pointer',
                      filter: 'brightness(1.1)',
                    },
                    pressed: {
                      fill: fillColor,
                      fillOpacity: 1,
                      stroke: '#000',
                      strokeWidth: 2,
                      outline: 'none',
                    },
                  }}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  onClick={() => {
                    if (provinceData) {
                      onProvinceClick(provinceData);
                    }
                  }}
                  data-tooltip-html={provinceData ? getTooltipContent(provinceData) : undefined}
                />
              );
            })
          }
        </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Controles de Zoom */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          size="icon"
          variant="secondary"
          className="bg-background/90 hover:bg-background shadow-lg"
          title="Acercar"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          size="icon"
          variant="secondary"
          className="bg-background/90 hover:bg-background shadow-lg"
          title="Alejar"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleReset}
          size="icon"
          variant="secondary"
          className="bg-background/90 hover:bg-background shadow-lg"
          title="Restablecer vista"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <Tooltip
        id="province-tooltip"
        className="z-50 glassmorphism-solid !p-4 !rounded-lg !shadow-2xl"
        style={{ backgroundColor: 'hsl(var(--card)/0.95)', color: 'hsl(var(--card-foreground))' }}
        border="1px solid hsl(var(--border))"
      />
      <div className="absolute bottom-4 right-4 bg-background/80 p-3 rounded-lg shadow-md border">
        <h4 className="font-bold text-sm mb-2">Leyenda</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#7c3aed'}}></div><span className="text-xs">LLA</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#3b82f6'}}></div><span className="text-xs">FP</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#f97316'}}></div><span className="text-xs">PU</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#849221'}}></div><span className="text-xs">Provincial</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#e5e7eb'}}></div><span className="text-xs">Sin datos</span></div>
        </div>
      </div>
    </div>
  );
}
