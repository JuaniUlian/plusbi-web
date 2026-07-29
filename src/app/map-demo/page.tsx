"use client";

import { ArgentinaMap } from "@/components/maps/argentina-map";
import { useState } from "react";

interface ProvinceProperties {
  GID_0: string;
  NAME_0: string;
  GID_1: string;
  NAME: string;
  COLOR: string;
  NL_NAME_1: string;
  TYPE_1: string;
  ENGTYPE_1: string;
  CC_1: string;
  HASC_1: string;
  VALUE: string;
}

export default function MapDemoPage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [provinceData, setProvinceData] = useState<ProvinceProperties | null>(null);

  const handleProvinceClick = (provinceName: string, data: ProvinceProperties) => {
    setSelectedProvince(provinceName);
    setProvinceData(data);
    console.log("Provincia seleccionada:", provinceName, data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Mapa Interactivo de Argentina
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2">
          <ArgentinaMap
            width={800}
            height={600}
            center={[-63.6167, -38.4161]}
            scale={800}
            currency="$"
            onProvinceClick={handleProvinceClick}
          />
        </div>

        {/* Province Info Panel */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Información de la Provincia
            </h2>

            {selectedProvince ? (
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Nombre:</span>{" "}
                  <span className="text-muted-foreground">{selectedProvince}</span>
                </div>

                {provinceData && (
                  <>
                    <div>
                      <span className="font-medium">Tipo:</span>{" "}
                      <span className="text-muted-foreground">
                        {provinceData.TYPE_1}
                      </span>
                    </div>

                    <div>
                      <span className="font-medium">Valor:</span>{" "}
                      <span className="text-muted-foreground">
                        ${new Intl.NumberFormat("es-AR").format(parseInt(provinceData.VALUE, 10))}
                      </span>
                    </div>

                    <div>
                      <span className="font-medium">HASC:</span>{" "}
                      <span className="text-muted-foreground">
                        {provinceData.HASC_1}
                      </span>
                    </div>

                    <div>
                      <span className="font-medium">GID:</span>{" "}
                      <span className="text-muted-foreground">{provinceData.GID_1}</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                Haz clic en una provincia para ver su información
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-primary/5 border border-primary/15 rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-2">
              Cómo usar el mapa:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Haz clic en una provincia para ver sus datos</li>
              <li>Pasa el mouse sobre una provincia para ver un tooltip</li>
              <li>Usa los botones + y - para hacer zoom</li>
              <li>Usá el botón Reiniciar para volver al zoom inicial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
