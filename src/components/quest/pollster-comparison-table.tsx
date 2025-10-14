
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
  sample?: number | null;
  methodology?: string | null;
  margin_error?: number | null;
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
          <span className="font-medium">{poll.sample ? poll.sample.toLocaleString('es-AR') : 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Método:</span>
          <span className="font-medium text-right max-w-[150px] truncate" title={poll.methodology || 'N/A'}>
            {poll.methodology || 'N/A'}
          </span>
        </div>
        {poll.margin_error && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Error:</span>
            <span className="font-medium">±{poll.margin_error}%</span>
          </div>
        )}
        <hr className="my-2 border-border" />
        <div className="space-y-2">
          {poll.LLA !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#7c3aed' }}>
              <span>LLA:</span>
              <span>{formatPercentage(poll.LLA)}</span>
            </div>
          )}
          {poll.FP !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#3b82f6' }}>
              <span>FP:</span>
              <span>{formatPercentage(poll.FP)}</span>
            </div>
          )}
          {poll.PU !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#f97316' }}>
              <span>PU:</span>
              <span>{formatPercentage(poll.PU)}</span>
            </div>
          )}
          {poll.UCR !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#ef4444' }}>
              <span>UCR:</span>
              <span>{formatPercentage(poll.UCR)}</span>
            </div>
          )}
          {poll.PRO !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#eab308' }}>
              <span>PRO:</span>
              <span>{formatPercentage(poll.PRO)}</span>
            </div>
          )}
          {poll.FIT !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#dc2626' }}>
              <span>FIT:</span>
              <span>{formatPercentage(poll.FIT)}</span>
            </div>
          )}
          {poll.Provincial !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#f59e0b' }}>
              <span>Provincial:</span>
              <span>{formatPercentage(poll.Provincial)}</span>
            </div>
          )}
          {poll.Others !== null && (
            <div className="flex justify-between font-bold" style={{ color: '#64748b' }}>
              <span>Otros:</span>
              <span>{formatPercentage(poll.Others)}</span>
            </div>
          )}
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
    // Filtrar solo encuestas nacionales
    const nationalPolls = data.filter(poll => poll.scope === 'national');

    nationalPolls.forEach((poll) => {
      const existingPoll = map.get(poll.pollster);
      if (!existingPoll || new Date(poll.date) > new Date(existingPoll.date)) {
        map.set(poll.pollster, poll);
      }
    });
    return map;
  }, [data]);

  const selectedPoll1Data = pollster1 ? latestPollsMap.get(pollster1) : undefined;
  const selectedPoll2Data = pollster2 ? latestPollsMap.get(pollster2) : undefined;

  // Filtrar solo encuestadoras que tienen datos nacionales
  const nationalPollsters = useMemo(() => {
    return Array.from(latestPollsMap.keys()).sort((a, b) => a.localeCompare(b));
  }, [latestPollsMap]);

  const availablePollsters1 = nationalPollsters.filter(p => p !== pollster2);
  const availablePollsters2 = nationalPollsters.filter(p => p !== pollster1);

  if (nationalPollsters.length < 2) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        No hay suficientes encuestadoras nacionales para comparar.
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
