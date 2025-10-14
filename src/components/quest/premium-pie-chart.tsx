
'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface PieChartData {
  LLA?: number | null;
  FP?: number | null;
  PU?: number | null;
}

interface PremiumPieChartProps {
  data: PieChartData;
}

export function PremiumPieChart({ data }: PremiumPieChartProps) {
  const labels: string[] = [];
  const values: number[] = [];
  const colors: string[] = [];

  if (data.LLA && data.LLA > 0) {
    labels.push('LLA');
    values.push(data.LLA);
    colors.push('#7c3aed');
  }
  if (data.FP && data.FP > 0) {
    labels.push('FP');
    values.push(data.FP);
    colors.push('#3b82f6');
  }
  if (data.PU && data.PU > 0) {
    labels.push('PU');
    values.push(data.PU);
    colors.push('#f97316'); // Orange color
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(c => c),
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverBorderColor: '#fff',
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(55, 65, 81)',
          font: {
            size: 14,
            weight: 600,
            family: 'Nunito, sans-serif'
          },
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 25,
          boxWidth: 18,
          boxHeight: 18,
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
        boxPadding: 8,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return ` ${label}: ${value.toFixed(1)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Distribución de Intención de Voto</h3>
        <p className="text-sm text-gray-600">Encuesta más reciente</p>
      </div>
      <div className="w-full max-w-sm h-[300px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
