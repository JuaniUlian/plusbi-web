'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

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

// SVG path simplificado de Argentina con provincias principales
const ARGENTINA_SVG_PATHS = {
  'Buenos Aires': 'M 350 420 L 380 410 L 420 430 L 430 470 L 410 490 L 380 480 L 350 460 Z',
  'Cordoba': 'M 300 360 L 340 350 L 360 380 L 350 410 L 320 400 L 300 380 Z',
  'Santa Fe': 'M 340 320 L 370 310 L 380 340 L 370 370 L 340 360 L 330 340 Z',
  'Mendoza': 'M 240 380 L 270 370 L 280 400 L 270 420 L 240 410 L 230 390 Z',
  'Tucuman': 'M 310 280 L 330 275 L 340 295 L 330 310 L 310 305 Z',
  'Entre Rios': 'M 370 360 L 390 355 L 400 375 L 390 390 L 370 385 Z',
  'Salta': 'M 290 200 L 320 190 L 330 220 L 320 240 L 290 230 Z',
  'Chaco': 'M 330 250 L 360 245 L 370 270 L 360 285 L 330 280 Z',
  'Corrientes': 'M 380 300 L 410 295 L 420 320 L 410 335 L 380 330 Z',
  'Misiones': 'M 420 280 L 440 275 L 445 295 L 440 310 L 420 305 Z',
  'Santiago del Estero': 'M 320 290 L 345 285 L 355 310 L 345 325 L 320 320 Z',
  'Jujuy': 'M 295 170 L 315 165 L 325 185 L 315 200 L 295 195 Z',
  'Catamarca': 'M 270 270 L 295 265 L 305 290 L 295 305 L 270 300 Z',
  'La Rioja': 'M 250 310 L 275 305 L 285 330 L 275 345 L 250 340 Z',
  'San Juan': 'M 230 340 L 255 335 L 265 360 L 255 375 L 230 370 Z',
  'San Luis': 'M 270 370 L 295 365 L 305 390 L 295 405 L 270 400 Z',
  'La Pampa': 'M 300 430 L 330 425 L 340 455 L 330 470 L 300 465 Z',
  'Neuquen': 'M 230 460 L 260 455 L 270 485 L 260 500 L 230 495 Z',
  'Rio Negro': 'M 270 500 L 310 495 L 320 530 L 310 545 L 270 540 Z',
  'Chubut': 'M 260 550 L 300 545 L 310 590 L 300 605 L 260 600 Z',
  'Santa Cruz': 'M 250 610 L 290 605 L 300 670 L 290 685 L 250 680 Z',
  'Tierra del Fuego': 'M 270 700 L 300 695 L 310 720 L 300 730 L 270 725 Z',
  'Formosa': 'M 350 230 L 380 225 L 390 255 L 380 270 L 350 265 Z'
};

export function ArgentinaHeatmap({ provincesData, onProvinceClick }: ArgentinaHeatmapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getProvinceData = (provinceName: string): ProvinceData | undefined => {
    return provincesData.find(
      (p) =>
        p.name.toLowerCase() === provinceName.toLowerCase() ||
        p.name.toLowerCase().includes(provinceName.toLowerCase()) ||
        provinceName.toLowerCase().includes(p.name.toLowerCase())
    );
  };

  const handleMouseEnter = (provinceName: string, event: React.MouseEvent) => {
    setHoveredProvince(provinceName);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredProvince(null);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex justify-center items-center">
      <svg
        viewBox="0 0 600 800"
        className="w-full h-full max-w-2xl"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {Object.entries(ARGENTINA_SVG_PATHS).map(([provinceName, path]) => {
          const provinceData = getProvinceData(provinceName);
          const fillColor = provinceData?.color || '#e5e7eb';
          const isHovered = hoveredProvince === provinceName;

          return (
            <g key={provinceName}>
              <path
                d={path}
                fill={fillColor}
                stroke="#fff"
                strokeWidth="2"
                className="transition-all duration-300 cursor-pointer"
                style={{
                  filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
                  opacity: isHovered ? 0.9 : 0.8,
                }}
                onMouseEnter={(e) => handleMouseEnter(provinceName, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (provinceData) {
                    onProvinceClick(provinceData);
                  }
                }}
              />
            </g>
          );
        })}
      </svg>

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
