
'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProvincialPartyShortName } from '@/lib/provincial-parties';

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
  sample?: number | null;
  methodology?: string | null;
  margin_error?: number | null;
  // Campos expandidos
  provincialPartyName?: string | null;
  CC?: number | null;
  ProFederal?: number | null;
  Potencia?: number | null;
  ProyectoSur?: number | null;
  UnionFederal?: number | null;
  FrenteIzquierda?: number | null;
}

interface PollsterComparisonTableProps {
  data: EncuestaData[];
  isPremium: boolean;
  comparisonCount: number;
  onComparisonUsed: () => void;
  onUpgradeClick: () => void;
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
          {poll.CC !== null && poll.CC !== undefined && poll.CC > 0 && (
            <div className="flex justify-between font-bold" style={{ color: '#f59e0b' }}>
              <span>CC:</span>
              <span>{formatPercentage(poll.CC)}</span>
            </div>
          )}
          {poll.ProFederal !== null && poll.ProFederal !== undefined && poll.ProFederal > 0 && (
            <div className="flex justify-between font-bold" style={{ color: '#fbbf24' }}>
              <span>ProFederal:</span>
              <span>{formatPercentage(poll.ProFederal)}</span>
            </div>
          )}
          {poll.Potencia !== null && poll.Potencia !== undefined && poll.Potencia > 0 && (
            <div className="flex justify-between font-bold" style={{ color: '#a855f7' }}>
              <span>Potencia:</span>
              <span>{formatPercentage(poll.Potencia)}</span>
            </div>
          )}
          {poll.ProyectoSur !== null && poll.ProyectoSur !== undefined && poll.ProyectoSur > 0 && (
            <div className="flex justify-between font-bold" style={{ color: '#ec4899' }}>
              <span>ProyectoSur:</span>
              <span>{formatPercentage(poll.ProyectoSur)}</span>
            </div>
          )}
          {poll.UnionFederal !== null && poll.UnionFederal !== undefined && poll.UnionFederal > 0 && (
            <div className="flex justify-between font-bold" style={{ color: '#06b6d4' }}>
              <span>UniónFederal:</span>
              <span>{formatPercentage(poll.UnionFederal)}</span>
            </div>
          )}
          {poll.FrenteIzquierda !== null && poll.FrenteIzquierda !== undefined && poll.FrenteIzquierda > 0 && (
            <div className="flex justify-between font-bold" style={{ color: '#b91c1c' }}>
              <span>FrenteIzq:</span>
              <span>{formatPercentage(poll.FrenteIzquierda)}</span>
            </div>
          )}
          {poll.Provincial !== null && poll.Provincial > 0 && (
            <div className="flex justify-between font-bold" style={{ color: '#849221' }}>
              <span>{poll.provincialPartyName || getProvincialPartyShortName(poll.province)}:</span>
              <span>{formatPercentage(poll.Provincial)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export function PollsterComparisonTable({ data, isPremium, comparisonCount, onComparisonUsed, onUpgradeClick }: PollsterComparisonTableProps) {
  const [pollster1, setPollster1] = useState<string | undefined>(undefined);
  const [pollster2, setPollster2] = useState<string | undefined>(undefined);

  const latestPollsMap = useMemo(() => {
    const map = new Map<string, EncuestaData>();

    data.forEach((poll) => {
      const existingPoll = map.get(poll.pollster);

      // Priorizar encuestas nacionales sobre provinciales
      // Si no hay ninguna, tomar cualquiera
      // Si ya hay una, reemplazar solo si:
      // 1. La nueva es nacional y la existente no, O
      // 2. Ambas son del mismo scope y la nueva es más reciente
      if (!existingPoll) {
        map.set(poll.pollster, poll);
      } else {
        const isNewNational = poll.scope === 'national';
        const isExistingNational = existingPoll.scope === 'national';
        const isNewer = new Date(poll.date) > new Date(existingPoll.date);

        if (isNewNational && !isExistingNational) {
          // Priorizar nacional sobre provincial
          map.set(poll.pollster, poll);
        } else if (isNewNational === isExistingNational && isNewer) {
          // Mismo scope, tomar la más reciente
          map.set(poll.pollster, poll);
        }
      }
    });
    return map;
  }, [data]);

  const selectedPoll1Data = pollster1 ? latestPollsMap.get(pollster1) : undefined;
  const selectedPoll2Data = pollster2 ? latestPollsMap.get(pollster2) : undefined;

  const allPollsters = useMemo(() => {
    return Array.from(new Set(data.map(p => p.pollster))).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const availablePollsters1 = allPollsters.filter(p => p !== pollster2);
  const availablePollsters2 = allPollsters.filter(p => p !== pollster1);

  // Verificar si ya alcanzó el límite antes de permitir cambios
  const canCompare = isPremium || comparisonCount < 2;

  // Contar cada cambio de selección como una comparación
  const handlePollster1Change = (value: string) => {
    // Si ya alcanzó el límite y no es premium, no permitir cambios
    if (!canCompare) {
      return;
    }

    setPollster1(value);

    // Si ya hay una segunda encuestadora seleccionada, contar como comparación
    if (value && pollster2 && !isPremium) {
      onComparisonUsed();
    }
  };

  const handlePollster2Change = (value: string) => {
    // Si ya alcanzó el límite y no es premium, no permitir cambios
    if (!canCompare) {
      return;
    }

    setPollster2(value);

    // Si ya hay una primera encuestadora seleccionada, contar como comparación
    if (pollster1 && value && !isPremium) {
      onComparisonUsed();
    }
  };

  if (allPollsters.length < 2) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        No hay suficientes encuestadoras para comparar.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/2">
          <Select value={pollster1} onValueChange={handlePollster1Change} disabled={!canCompare}>
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
          <Select value={pollster2} onValueChange={handlePollster2Change} disabled={!canCompare}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona Encuestadora 2" />
            </SelectTrigger>
            <SelectContent>
              {availablePollsters2.map(p => <SelectItem key={`p2-${p}`} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!isPremium && comparisonCount > 0 && comparisonCount < 2 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-sm text-center">
          ⚠️ Has usado {comparisonCount} de 2 comparaciones gratuitas. Obtén Premium para comparaciones ilimitadas.
        </div>
      )}

      {!canCompare && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-xl font-bold">🔒 Límite de comparaciones alcanzado</div>
            <p className="text-muted-foreground">
              Has agotado tus 2 comparaciones gratuitas como usuario invitado.
            </p>
            <p className="text-sm text-muted-foreground">
              Actualiza a Premium para comparaciones ilimitadas y acceso completo a todas las funciones.
            </p>
            <button
              onClick={onUpgradeClick}
              className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Obtener Premium
            </button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <PollCard poll={selectedPoll1Data} />
        <PollCard poll={selectedPoll2Data} />
      </div>
    </div>
  );
}
