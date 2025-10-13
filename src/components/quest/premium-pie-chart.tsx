
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
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff',
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
            size: 16,
            weight: '700',
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 25,
          boxWidth: 20,
          boxHeight: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 15,
        },
        padding: 16,
        cornerRadius: 10,
        displayColors: true,
        boxPadding: 8,
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return ` ${context.label}: ${context.parsed}% (${percentage}% del total)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center py-8 px-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Distribución de Intención de Voto</h3>
        <p className="text-base text-gray-600">Datos de la encuesta seleccionada</p>
      </div>
      <div className="w-full max-w-2xl h-[450px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
