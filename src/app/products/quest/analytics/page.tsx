'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Activity, FileText, TrendingUp, LogIn } from 'lucide-react';
import Link from 'next/link';

interface AnalyticsStats {
  totalUsers: number;
  newUsers: number;
  usersByRole: Array<{ role: string; _count: number }>;
  activeUsersCount: number;
  eventsByType: Array<{ eventType: string; _count: number }>;
  loginStats: Array<{ eventType: string; _count: number }>;
  reportsGenerated: number;
  reportsByType: Array<{ reportType: string; _count: number }>;
  topUsers: Array<{ userEmail: string; userRole: string; _count: number }>;
  topEvents: Array<{ eventName: string; _count: number }>;
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/products/quest/login');
    },
  });
  const router = useRouter();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [period, setPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);

  const isSuperAdmin = session?.user?.role === 'SUPERADMIN';

  useEffect(() => {
    if (status === 'authenticated' && !isSuperAdmin) {
      router.push('/products/quest/dashboard');
    }
  }, [status, isSuperAdmin, router]);

  useEffect(() => {
    if (!isSuperAdmin) return;

    setLoading(true);
    fetch(`/api/analytics/stats?period=${period}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error('Error loading analytics:', err))
      .finally(() => setLoading(false));
  }, [period, isSuperAdmin]);

  if (status === 'loading' || !isSuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quest Analytics</h1>
            <p className="text-muted-foreground">Panel de métricas y actividad de usuarios</p>
          </div>
          <Link href="/products/quest/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          {[
            { value: '1d', label: 'Último día' },
            { value: '7d', label: 'Última semana' },
            { value: '30d', label: 'Último mes' },
            { value: 'all', label: 'Todo el tiempo' },
          ].map(p => (
            <Button
              key={p.value}
              variant={period === p.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p.value)}
            >
              {p.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando estadísticas...</p>
          </div>
        ) : stats ? (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+{stats.newUsers} nuevos en el período</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeUsersCount}</div>
                  <p className="text-xs text-muted-foreground">En el período seleccionado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reportes Generados</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.reportsGenerated}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.reportsByType.find(r => r.reportType === 'NATIONAL')?._count || 0} nacionales,{' '}
                    {stats.reportsByType.find(r => r.reportType === 'PROVINCIAL')?._count || 0} provinciales
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.eventsByType.reduce((sum, e) => sum + e._count, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Todas las interacciones</p>
                </CardContent>
              </Card>
            </div>

            {/* Users by Role */}
            <Card>
              <CardHeader>
                <CardTitle>Usuarios por Rol</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.usersByRole.map(role => (
                    <div key={role.role} className="flex justify-between items-center">
                      <span className="font-medium">{role.role}</span>
                      <span className="text-2xl font-bold">{role._count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Login Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Estadísticas de Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.loginStats.map(stat => (
                    <div key={stat.eventType} className="flex justify-between items-center">
                      <span className={stat.eventType === 'LOGIN_SUCCESS' ? 'text-green-600' : 'text-red-600'}>
                        {stat.eventType === 'LOGIN_SUCCESS' ? '✓ Login Exitoso' : '✗ Login Fallido'}
                      </span>
                      <span className="text-2xl font-bold">{stat._count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Users */}
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Usuarios Más Activos</CardTitle>
                <CardDescription>En el período seleccionado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topUsers.map((user, idx) => (
                    <div key={user.userEmail} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">#{idx + 1}. {user.userEmail}</span>
                        <span className="text-xs text-muted-foreground ml-2">({user.userRole})</span>
                      </div>
                      <span className="text-lg font-bold">{user._count} eventos</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Events */}
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Eventos Más Frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.topEvents.map((event, idx) => (
                    <div key={event.eventName} className="flex justify-between items-center">
                      <span className="font-medium">#{idx + 1}. {event.eventName}</span>
                      <span className="text-lg font-bold">{event._count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Events by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {stats.eventsByType.map(event => (
                    <div key={event.eventType} className="border rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">{event.eventType}</div>
                      <div className="text-2xl font-bold">{event._count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se pudieron cargar las estadísticas</p>
          </div>
        )}
      </div>
    </div>
  );
}
