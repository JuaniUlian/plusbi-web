
'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  pollsters: string[];
}

const PollCard = ({ poll }: { poll: EncuestaData | undefined }) => {
  if (!poll) {
    return (
      <Card className="flex-1 h-full flex items-center justify-center min-h-[260px]">
        <p className="text-muted-foreground p-4 text-center">Selecciona una encuestadora</p>
      </Card>
    );
  }

  const formatPercentage = (value: number | null) => (value !== null ? `${value.toFixed(1)}%` : 'N/A');

  return (
    <Card className="flex-1 bg-background/50">
      <CardHeader>
        <CardTitle className="text-lg truncate">{poll.pollster}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Fecha:</span>
          <span className="font-medium">{new Date(poll.date).toLocaleDateString('es-AR')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Muestra:</span>
          <span className="font-medium">N/A</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Método:</span>
          <span className="font-medium">N/A</span>
        </div>
        <hr className="my-2 border-border" />
        <div className="flex justify-between font-bold" style={{ color: '#7c3aed' }}>
          <span>LLA:</span>
          <span>{formatPercentage(poll.LLA)}</span>
        </div>
        <div className="flex justify-between font-bold" style={{ color: '#3b82f6' }}>
          <span>FP:</span>
          <span>{formatPercentage(poll.FP)}</span>
        </div>
        <div className="flex justify-between font-bold" style={{ color: '#f97316' }}>
          <span>PU:</span>
          <span>{formatPercentage(poll.PU)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export function PollsterComparisonTable({ data, pollsters }: PollsterComparisonTableProps) {
  const [pollster1, setPollster1] = useState<string | undefined>(undefined);
  const [pollster2, setPollster2] = useState<string | undefined>(undefined);

  const latestPollsMap = useMemo(() => {
    const map = new Map<string, EncuestaData>();
    data.forEach((poll) => {
      if (!map.has(poll.pollster) || new Date(poll.date) > new Date(map.get(poll.pollster)!.date)) {
        map.set(poll.pollster, poll);
      }
    });
    return map;
  }, [data]);

  const selectedPoll1Data = pollster1 ? latestPollsMap.get(pollster1) : undefined;
  const selectedPoll2Data = pollster2 ? latestPollsMap.get(pollster2) : undefined;

  const availablePollsters1 = pollsters.filter(p => p !== pollster2);
  const availablePollsters2 = pollsters.filter(p => p !== pollster1);

  if (pollsters.length < 2) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        No hay suficientes encuestadoras para comparar con los filtros actuales.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/2">
          <Select value={pollster1} onValueChange={setPollster1}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Encuestadora 1" />
            </SelectTrigger>
            <SelectContent>
              {availablePollsters1.map(p => <SelectItem key={`p1-${p}`} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="text-muted-foreground font-bold">VS</div>

        <div className="w-full sm:w-1/2">
          <Select value={pollster2} onValueChange={setPollster2}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Encuestadora 2" />
            </SelectTrigger>
            <SelectContent>
              {availablePollsters2.map(p => <SelectItem key={`p2-${p}`} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <PollCard poll={selectedPoll1Data} />
        <PollCard poll={selectedPoll2Data} />
      </div>
    </div>
  );
}

    