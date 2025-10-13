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
  [key: string]: number | null | undefined;
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
    colors.push('#10b981');
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(c => c),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff',
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 14,
            weight: '600',
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
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
