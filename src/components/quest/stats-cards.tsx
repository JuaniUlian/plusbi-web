'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardsProps {
  totalLLA: number;
  totalFP: number;
  lastUpdate: string;
  trendLLA?: 'up' | 'down' | 'stable';
  trendFP?: 'up' | 'down' | 'stable';
}

export function StatsCards({ totalLLA, totalFP, lastUpdate, trendLLA = 'stable', trendFP = 'stable' }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Card LLA */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glassmorphism-light border-2 hover:shadow-2xl transition-all duration-300"
          style={{
            borderColor: '#7c3aed',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total LLA</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold" style={{ color: '#7c3aed' }}>
                    {totalLLA.toFixed(1)}%
                  </h3>
                  {trendLLA !== 'stable' && (
                    <span className="text-sm flex items-center gap-1">
                      {trendLLA === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
              >
                <span className="text-3xl font-bold" style={{ color: '#7c3aed' }}>L</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card FP */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glassmorphism-light border-2 hover:shadow-2xl transition-all duration-300"
          style={{
            borderColor: '#3b82f6',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total FP</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold" style={{ color: '#3b82f6' }}>
                    {totalFP.toFixed(1)}%
                  </h3>
                  {trendFP !== 'stable' && (
                    <span className="text-sm flex items-center gap-1">
                      {trendFP === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              >
                <span className="text-3xl font-bold" style={{ color: '#3b82f6' }}>F</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card Última actualización */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glassmorphism-light border-2 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Última actualización</p>
                <h3 className="text-2xl font-bold">
                  {lastUpdate}
                </h3>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/20">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
