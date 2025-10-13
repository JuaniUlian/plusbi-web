'use client';

import { ComposableMap, Geographies, Geography, Popup } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

// TopoJSON de Argentina con coordenadas completas
const ARGENTINA_TOPO_JSON = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json';

interface ProvinceData {
  name: string;
  winner: string;
  color: string;
  percentages: { [key: string]: number };
}

interface ArgentinaHeatmapProps {
  provincesData: ProvinceData[];
  onProvinceClick: (province: ProvinceData) => void;
}

export function ArgentinaHeatmap({ provincesData, onProvinceClick }: ArgentinaHeatmapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);
  const [coords, setCoords] = useState<[number, number]>([0, 0]);

  const normalizeName = (name: string) => {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  };

  const getProvinceData = (geoName: string): ProvinceData | undefined => {
    const normalizedGeoName = normalizeName(geoName);

    // Mapeos para nombres comunes que no coinciden
    const nameMappings: { [key: string]: string } = {
        'ciudad autonoma de buenos aires': 'caba',
        'buenos aires': 'bsas',
        'tierra del fuego': 'tierra del fuego, antartida e islas del atlantico sur'
    };

    const mappedGeoName = nameMappings[normalizedGeoName] || normalizedGeoName;

    return provincesData.find((p) => {
      const normalizedDataName = normalizeName(p.name);
      return normalizedDataName === mappedGeoName;
    });
  };

  return (
    <div className="relative w-full h-full min-h-[600px]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [-64, -40],
        }}
        className="w-full h-full"
      >
        <Geographies geography={ARGENTINA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceData = getProvinceData(geo.properties.name);
              const fillColor = provinceData?.color || '#e5e7eb';
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: fillColor,
                      stroke: '#fff',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    hover: {
                      fill: fillColor,
                      stroke: '#333',
                      strokeWidth: 1.5,
                      outline: 'none',
                      cursor: 'pointer',
                      filter: 'brightness(1.1)',
                    },
                    pressed: {
                      fill: fillColor,
                      stroke: '#000',
                      strokeWidth: 2,
                      outline: 'none',
                    },
                  }}
                  onMouseEnter={(event: any) => {
                    if (provinceData) {
                        setHoveredProvince(provinceData);
                        setCoords([event.clientX, event.clientY]);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredProvince(null);
                  }}
                  onClick={() => {
                    if (provinceData) {
                      onProvinceClick(provinceData);
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {hoveredProvince && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: coords[0] + 20,
            top: coords[1] - 20,
          }}
        >
          <div className="glassmorphism-solid p-4 rounded-lg shadow-2xl border max-w-xs">
            <h3 className="font-bold text-lg mb-2">{hoveredProvince.name}</h3>
            <p className="text-sm mb-2">
              <strong>Ganador:</strong> {hoveredProvince.winner}
            </p>
            <div className="space-y-1">
              {Object.entries(hoveredProvince.percentages).map(
                ([party, percentage]) => (
                  <div key={party} className="flex justify-between text-sm">
                    <span>{party}:</span>
                    <span className="font-bold">{percentage}%</span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}

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