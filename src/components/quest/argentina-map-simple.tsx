'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProvinceData {
  name: string;
  winner: string;
  color: string;
  percentages: { [key: string]: number };
  pollsters?: string[];
}

interface ArgentinaMapProps {
  provincesData: ProvinceData[];
  onProvinceClick: (province: ProvinceData) => void;
}

// Coordenadas simplificadas de las provincias de Argentina para visualización
const PROVINCES_COORDINATES = [
  { name: 'Buenos Aires', x: 280, y: 440, width: 120, height: 100 },
  { name: 'Ciudad Autónoma de Buenos Aires', x: 300, y: 430, width: 20, height: 20 },
  { name: 'Catamarca', x: 220, y: 260, width: 60, height: 70 },
  { name: 'Chaco', x: 280, y: 240, width: 80, height: 60 },
  { name: 'Chubut', x: 220, y: 540, width: 100, height: 80 },
  { name: 'Córdoba', x: 240, y: 350, width: 80, height: 80 },
  { name: 'Corrientes', x: 320, y: 260, width: 70, height: 60 },
  { name: 'Entre Ríos', x: 300, y: 340, width: 70, height: 70 },
  { name: 'Formosa', x: 300, y: 200, width: 80, height: 50 },
  { name: 'Jujuy', x: 240, y: 180, width: 50, height: 50 },
  { name: 'La Pampa', x: 220, y: 460, width: 90, height: 70 },
  { name: 'La Rioja', x: 200, y: 300, width: 60, height: 70 },
  { name: 'Mendoza', x: 180, y: 380, width: 70, height: 80 },
  { name: 'Misiones', x: 360, y: 240, width: 40, height: 60 },
  { name: 'Neuquén', x: 180, y: 480, width: 70, height: 60 },
  { name: 'Río Negro', x: 210, y: 500, width: 90, height: 70 },
  { name: 'Salta', x: 240, y: 200, width: 70, height: 80 },
  { name: 'San Juan', x: 180, y: 340, width: 60, height: 60 },
  { name: 'San Luis', x: 210, y: 390, width: 60, height: 60 },
  { name: 'Santa Cruz', x: 180, y: 600, width: 120, height: 120 },
  { name: 'Santa Fe', x: 290, y: 300, width: 70, height: 80 },
  { name: 'Santiago del Estero', x: 250, y: 260, width: 80, height: 70 },
  { name: 'Tierra del Fuego', x: 200, y: 730, width: 100, height: 50 },
  { name: 'Tucumán', x: 240, y: 240, width: 50, height: 50 },
];

export function ArgentinaMapSimple({ provincesData, onProvinceClick }: ArgentinaMapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const normalizeName = (name: string) => {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  };

  const getProvinceData = (provinceName: string): ProvinceData | undefined => {
    const normalized = normalizeName(provinceName);
    return provincesData.find((p) => normalizeName(p.name) === normalized);
  };

  return (
    <div className="relative w-full" style={{ height: '800px' }}>
      <svg
        viewBox="0 0 600 800"
        className="w-full h-full"
        style={{ maxWidth: '100%' }}
      >
        {/* Mapa de Argentina usando rectángulos posicionados */}
        {PROVINCES_COORDINATES.map((province) => {
          const data = getProvinceData(province.name);
          const fillColor = data?.color || '#cbd5e1';

          return (
            <g key={province.name}>
              <rect
                x={province.x}
                y={province.y}
                width={province.width}
                height={province.height}
                fill={fillColor}
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-200 cursor-pointer hover:opacity-80"
                style={{
                  filter: hoveredProvince?.name === province.name ? 'brightness(1.2)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (data) {
                    setHoveredProvince(data);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMousePos({ x: rect.left + rect.width / 2, y: rect.top });
                  }
                }}
                onMouseLeave={() => setHoveredProvince(null)}
                onClick={() => data && onProvinceClick(data)}
              />
              {/* Nombre de la provincia */}
              <text
                x={province.x + province.width / 2}
                y={province.y + province.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[8px] font-bold pointer-events-none select-none"
                fill="#1e293b"
                style={{ textShadow: '0 0 3px white' }}
              >
                {province.name.length > 15 ? province.name.substring(0, 12) + '...' : province.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip flotante */}
      {hoveredProvince && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed z-50 pointer-events-none bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl border-2"
          style={{
            left: mousePos.x,
            top: mousePos.y - 10,
            transform: 'translate(-50%, -100%)',
            maxWidth: '300px',
          }}
        >
          <h3 className="font-bold text-lg mb-2">{hoveredProvince.name}</h3>
          <p className="text-sm mb-2">
            <strong>Ganador:</strong> {hoveredProvince.winner}
          </p>
          {hoveredProvince.pollsters && hoveredProvince.pollsters.length > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              <strong>Encuestadoras:</strong> {hoveredProvince.pollsters.join(', ')}
            </p>
          )}
          <div className="space-y-1">
            {Object.entries(hoveredProvince.percentages).map(([party, percentage]) => (
              <div key={party} className="flex justify-between text-sm">
                <span>{party}:</span>
                <span className="font-bold">{percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Leyenda */}
      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-xl border-2">
        <h4 className="font-bold text-sm mb-3">Leyenda</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#7c3aed' }}></div>
            <span className="text-xs">LLA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
            <span className="text-xs">FP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#f97316' }}></div>
            <span className="text-xs">PU</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
            <span className="text-xs">Provincial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#cbd5e1' }}></div>
            <span className="text-xs">Sin datos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
