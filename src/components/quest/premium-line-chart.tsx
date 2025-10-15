
'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MultiLineData {
  date: string;
  LLA?: number | null;
  FP?: number | null;
  PU?: number | null;
  UCR?: number | null;
  PRO?: number | null;
  FIT?: number | null;
  Provincial?: number | null;
  Others?: number | null;
  [key: string]: string | number | null | undefined;
}

interface PremiumLineChartProps {
  data: MultiLineData[];
}

// Configuración de colores para cada partido
const PARTY_COLORS: { [key: string]: { border: string; rgb: string } } = {
  LLA: { border: '#7c3aed', rgb: '124, 58, 237' },
  FP: { border: '#3b82f6', rgb: '59, 130, 246' },
  PU: { border: '#f97316', rgb: '249, 115, 22' },
  UCR: { border: '#ef4444', rgb: '239, 68, 68' },
  PRO: { border: '#eab308', rgb: '234, 179, 8' },
  FIT: { border: '#dc2626', rgb: '220, 38, 38' },
  Provincial: { border: '#849221', rgb: '132, 146, 33' },
  Others: { border: '#64748b', rgb: '100, 116, 139' },
};

export function PremiumLineChart({ data }: PremiumLineChartProps) {
  // Identificar qué partidos tienen al menos un dato no nulo
  const activeParties = Object.keys(PARTY_COLORS).filter(party =>
    data.some(d => d[party] != null)
  );

  // Crear datasets dinámicamente solo para partidos con datos
  const datasets = activeParties.map(party => {
    const colors = PARTY_COLORS[party];
    return {
      label: party,
      data: data.map((d) => d[party] || null),
      borderColor: colors.border,
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, `rgba(${colors.rgb}, 0.3)`);
        gradient.addColorStop(1, `rgba(${colors.rgb}, 0)`);
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: colors.border,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverBackgroundColor: colors.border,
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 3,
      borderWidth: 3,
      spanGaps: true,
    };
  });

  const chartData = {
    labels: data.map((d) => d.date),
    datasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 14,
            weight: 600,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            if (context.parsed.y === null) {
              return `${context.dataset.label}: N/A`;
            }
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 60,
        ticks: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 12,
          },
          callback: (value) => `${value}%`,
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.3)',
        },
      },
      x: {
        ticks: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
}
