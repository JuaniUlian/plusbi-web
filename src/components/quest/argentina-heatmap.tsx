'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

// TopoJSON de Argentina - URL pública
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
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getProvinceData = (geoName: string): ProvinceData | undefined => {
    // Normalizar nombres de provincias
    const normalizedName = geoName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

    return provincesData.find(
      (p) =>
        p.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim() === normalizedName ||
        p.name.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(p.name.toLowerCase())
    );
  };

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    setHoveredProvince(geo.properties.name);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredProvince(null);
  };

  return (
    <div className="relative w-full h-full min-h-[600px]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1200,
          center: [-63, -38],
        }}
        className="w-full h-full"
      >
        <Geographies geography={ARGENTINA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceData = getProvinceData(geo.properties.name);
              const fillColor = provinceData?.color || '#e5e7eb';
              const isHovered = hoveredProvince === geo.properties.name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#fff"
                  strokeWidth={1.5}
                  style={{
                    default: {
                      fill: fillColor,
                      stroke: '#fff',
                      strokeWidth: 1.5,
                      outline: 'none',
                    },
                    hover: {
                      fill: fillColor,
                      stroke: '#000',
                      strokeWidth: 2,
                      outline: 'none',
                      cursor: provinceData ? 'pointer' : 'default',
                      filter: 'brightness(1.1)',
                    },
                    pressed: {
                      fill: fillColor,
                      stroke: '#000',
                      strokeWidth: 2,
                      outline: 'none',
                    },
                  }}
                  onMouseEnter={(event: any) => handleMouseEnter(geo, event)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
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

      {/* Tooltip */}
      {hoveredProvince && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPosition.x + 20,
            top: tooltipPosition.y - 20,
          }}
        >
          <div className="glassmorphism-solid p-4 rounded-lg shadow-2xl border max-w-xs">
            <h3 className="font-bold text-lg mb-2">{hoveredProvince}</h3>
            {getProvinceData(hoveredProvince) ? (
              <>
                <p className="text-sm mb-2">
                  <strong>Ganador:</strong> {getProvinceData(hoveredProvince)?.winner}
                </p>
                <div className="space-y-1">
                  {Object.entries(getProvinceData(hoveredProvince)?.percentages || {}).map(
                    ([party, percentage]) => (
                      <div key={party} className="flex justify-between text-sm">
                        <span>{party}:</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                    )
                  )}
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 pointer-events-auto"
                  onClick={() => {
                    const data = getProvinceData(hoveredProvince);
                    if (data) onProvinceClick(data);
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Informe
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Sin datos disponibles</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
