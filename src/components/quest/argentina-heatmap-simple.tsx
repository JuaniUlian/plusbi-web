'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, MapPin } from 'lucide-react';

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

  return (
    <div className="w-full">
      <div className="text-center mb-8 p-6 bg-muted/30 rounded-lg border-2 border-dashed">
        <MapPin className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-4">
          Mapa interactivo de Argentina en desarrollo. Por ahora, usa la vista por tarjetas:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {provincesData.map((province) => (
          <motion.div
            key={province.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredProvince(province.name)}
            onMouseLeave={() => setHoveredProvince(null)}
          >
            <Card
              className="cursor-pointer h-full border-2 transition-all duration-300"
              style={{
                borderColor: province.color,
                backgroundColor: `${province.color}15`,
                boxShadow: hoveredProvince === province.name ? `0 8px 24px ${province.color}40` : 'none'
              }}
              onClick={() => onProvinceClick(province)}
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: province.color }}
                  />
                  <h3 className="font-bold text-lg">{province.name}</h3>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <span className="text-muted-foreground">Ganador:</span>
                    <span style={{ color: province.color }}>{province.winner}</span>
                  </p>

                  <div className="space-y-1">
                    {Object.entries(province.percentages).map(([party, percentage]) => (
                      <div key={party} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{party}</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full mt-2"
                  size="sm"
                  variant="outline"
                  style={{ borderColor: province.color, color: province.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onProvinceClick(province);
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Informe
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
