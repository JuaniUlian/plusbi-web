'use client';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

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

const provinceCoordinates: { [key: string]: [number, number] } = {
    'Buenos Aires': [-34.6037, -58.3816],
    'Catamarca': [-28.4696, -65.7852],
    'Chaco': [-27.4606, -58.9839],
    'Chubut': [-43.3002, -65.1023],
    'Cordoba': [-31.4201, -64.1888],
    'Corrientes': [-27.4692, -58.8306],
    'Entre Rios': [-31.7346, -60.5238],
    'Formosa': [-26.1775, -58.1756],
    'Jujuy': [-24.1858, -65.2995],
    'La Pampa': [-36.6167, -64.2833],
    'La Rioja': [-29.4131, -66.8557],
    'Mendoza': [-32.8895, -68.8458],
    'Misiones': [-27.3671, -55.8961],
    'Neuquen': [-38.9516, -68.0591],
    'Rio Negro': [-40.8135, -63.0019],
    'Salta': [-24.7821, -65.4232],
    'San Juan': [-31.5375, -68.5364],
    'San Luis': [-33.295, -66.3356],
    'Santa Cruz': [-51.6226, -69.2181],
    'Santa Fe': [-31.6107, -60.6973],
    'Santiago del Estero': [-27.7951, -64.2612],
    'Tierra del Fuego': [-54.8072, -68.3044],
    'Tucuman': [-26.8083, -65.2176],
    'CABA': [-34.6037, -58.3816]
};


export function ArgentinaMapSimple({ provincesData, onProvinceClick }: ArgentinaMapProps) {
  const getProvinceData = (provinceName: string): ProvinceData | undefined => {
    return provincesData.find((p) => p.name === provinceName);
  };
  
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <MapContainer
      center={[-40.0, -64.0]}
      zoom={4}
      style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {Object.entries(provinceCoordinates).map(([provinceName, coords]) => {
        const provinceData = getProvinceData(provinceName);
        if (!provinceData) return null;

        return (
          <CircleMarker
            key={provinceName}
            center={coords}
            radius={15}
            pathOptions={{
              color: provinceData.color,
              fillColor: provinceData.color,
              fillOpacity: 0.7
            }}
          >
            <Tooltip>
                <div>
                    <h3 className="font-bold">{provinceName}</h3>
                </div>
            </Tooltip>
            <Popup>
              <div>
                <h3 className="font-bold text-lg mb-2">{provinceData.name}</h3>
                <div className="space-y-1">
                  {Object.entries(provinceData.percentages).map(
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
                    className="w-full mt-4" 
                    onClick={() => onProvinceClick(provinceData)}
                >
                    <FileText className="mr-2 h-4 w-4" /> Ver Informe
                </Button>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}

      <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control leaflet-bar bg-white p-2 rounded shadow">
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
    </MapContainer>
  );
}
