
'use client';

import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';

interface EncuestaData {
  date: string;
  pollster: string;
  scope: string;
  province: string | null;
  chamber: string;
  LLA: number | null;
  FP: number | null;
  PU: number | null;
  UCR: number | null;
  PRO: number | null;
  FIT: number | null;
  Provincial: number | null;
  Others: number | null;
}

interface PollsterComparisonTableProps {
  data: EncuestaData[];
}

export function PollsterComparisonTable({ data }: PollsterComparisonTableProps) {
  const latestPollsByPollster = useMemo(() => {
    const latestPolls: { [key: string]: EncuestaData } = {};

    data.forEach((poll) => {
      if (
        !latestPolls[poll.pollster] ||
        new Date(poll.date) > new Date(latestPolls[poll.pollster].date)
      ) {
        latestPolls[poll.pollster] = poll;
      }
    });

    return Object.values(latestPolls).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data]);

  const formatPercentage = (value: number | null) => {
    return value !== null ? `${value.toFixed(1)}%` : 'N/A';
  };

  if (latestPollsByPollster.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        No hay datos de encuestas para la selección actual.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Encuestadora</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
            <TableHead className="text-center">Muestra</TableHead>
            <TableHead className="text-center">Método</TableHead>
            <TableHead className="text-center font-bold" style={{ color: '#7c3aed' }}>LLA</TableHead>
            <TableHead className="text-center font-bold" style={{ color: '#3b82f6' }}>FP</TableHead>
            <TableHead className="text-center font-bold" style={{ color: '#f97316' }}>PU</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestPollsByPollster.map((poll) => (
            <TableRow key={poll.pollster}>
              <TableCell className="font-medium">{poll.pollster}</TableCell>
              <TableCell className="text-center">
                {new Date(poll.date).toLocaleDateString('es-AR')}
              </TableCell>
              <TableCell className="text-center text-muted-foreground">N/A</TableCell>
              <TableCell className="text-center text-muted-foreground">N/A</TableCell>
              <TableCell className="text-center font-semibold">{formatPercentage(poll.LLA)}</TableCell>
              <TableCell className="text-center font-semibold">{formatPercentage(poll.FP)}</TableCell>
              <TableCell className="text-center font-semibold">{formatPercentage(poll.PU)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
