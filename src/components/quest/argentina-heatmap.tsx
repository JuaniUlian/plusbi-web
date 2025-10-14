
'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import type { ProvinceData } from '@/app/products/quest/dashboard/page';

const ARGENTINA_GEOJSON = '/data/argentina-provinces.json';

interface ArgentinaHeatmapProps {
  provincesData: ProvinceData[];
  onProvinceClick: (province: ProvinceData) => void;
}

export function ArgentinaHeatmap({ provincesData, onProvinceClick }: ArgentinaHeatmapProps) {
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
    const percentages = Object.entries(province.percentages)
      .map(([party, value]) => `<div>${party}: <strong>${value}%</strong></div>`)
      .join('');
    return `
      <div class="text-left">
        <h3 class="font-bold text-lg mb-2">${province.name}</h3>
        <p class="text-sm mb-2"><strong>Ganador:</strong> ${province.winner}</p>
        <div class="space-y-1">${percentages}</div>
      </div>
    `;
  };

  return (
    <div className="relative w-full h-full min-h-[600px]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1200,
          center: [-64, -40],
        }}
        className="w-full h-full"
        data-tooltip-id="province-tooltip"
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
      </ComposableMap>
      <Tooltip 
        id="province-tooltip" 
        className="z-50 glassmorphism-solid !p-4 !rounded-lg !shadow-2xl"
        style={{ backgroundColor: 'hsl(var(--card)/0.95)', color: 'hsl(var(--card-foreground))', border: '1px solid hsl(var(--border))' }}
      />
      <div className="absolute bottom-4 right-4 bg-background/80 p-3 rounded-lg shadow-md border">
        <h4 className="font-bold text-sm mb-2">Leyenda</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#7c3aed'}}></div><span className="text-xs">LLA</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#3b82f6'}}></div><span className="text-xs">FP</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#f97316'}}></div><span className="text-xs">PU</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#f59e0b'}}></div><span className="text-xs">Provincial</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{backgroundColor: '#e5e7eb'}}></div><span className="text-xs">Sin datos</span></div>
        </div>
      </div>
    </div>
  );
}
