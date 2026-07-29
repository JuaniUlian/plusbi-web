"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { MAP_JSON, STYLES_MAP, ZOOM } from "@/constants/argentina-map";

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

interface ArgentinaMapProps {
  width?: number;
  height?: number;
  center?: [number, number];
  scale?: number;
  currency?: string;
  onProvinceClick?: (provinceName: string, provinceData: ProvinceProperties) => void;
}

export function ArgentinaMap({
  width = 800,
  height = 600,
  center = [-63.6167, -38.4161],
  scale = 800,
  currency = "$",
  onProvinceClick,
}: ArgentinaMapProps) {
  const [zoom, setZoom] = useState(1);
  const [tooltipContent, setTooltipContent] = useState("");

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + ZOOM, 4));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - ZOOM, 1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const formatNumber = (value: string | number) => {
    const num = typeof value === "string" ? parseInt(value, 10) : value;
    return new Intl.NumberFormat("es-AR").format(num);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Zoom Controls */}
      <div className="flex gap-2">
        <button
          onClick={handleZoomIn}
          className="min-h-11 min-w-11 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          aria-label="Acercar"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="min-h-11 min-w-11 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          aria-label="Alejar"
        >
          -
        </button>
        <button
          onClick={handleResetZoom}
          className="min-h-11 rounded-full bg-secondary px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          Reiniciar
        </button>
      </div>

      {/* Map */}
      <div className="w-full border border-border rounded-lg overflow-hidden bg-card">
        <ComposableMap
          width={width}
          height={height}
          projection="geoMercator"
          projectionConfig={{
            scale,
            center,
          }}
        >
          <ZoomableGroup zoom={zoom} center={center}>
            <Geographies geography={MAP_JSON}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const properties = geo.properties as ProvinceProperties;
                  const { NAME, VALUE } = properties;
                  const formattedValue = `${currency} ${formatNumber(VALUE)}`;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      tabIndex={0}
                      role="button"
                      aria-label={`${NAME}: ${formattedValue}`}
                      onMouseEnter={() => {
                        setTooltipContent(`${NAME}: ${formattedValue}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onClick={() => {
                        if (onProvinceClick) {
                          onProvinceClick(NAME, properties);
                        }
                      }}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (onProvinceClick) {
                            onProvinceClick(NAME, properties);
                          }
                        }
                      }}
                      data-tooltip-id="map-tooltip"
                      data-tooltip-content={`${NAME}: ${formattedValue}`}
                      style={{
                        default: {
                          ...STYLES_MAP.default,
                          transition: "all 0.2s",
                        },
                        hover: {
                          ...STYLES_MAP.hover,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        },
                        pressed: {
                          ...STYLES_MAP.pressed,
                          transition: "all 0.2s",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      <Tooltip id="map-tooltip" />
    </div>
  );
}
