'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, Activity, FileText, TrendingUp, LogIn, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Key, Shield, Copy, Check, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { EventUploader } from '@/components/quest/EventUploader';

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

interface AnalyticsEvent {
  id: string;
  eventType: string;
  eventName: string;
  userEmail: string | null;
  userRole: string | null;
  metadata: any;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  guestExpiresAt: string | null;
  lastActivity: string | null;
  reportsGenerated: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/products/quest/login');
    },
  });
  const { toast } = useToast();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [period, setPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  // Filtros para eventos
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState<'summary' | 'events' | 'users' | 'data-management'>('summary');

  // Estado para reseteo de contraseña
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [resetting, setResetting] = useState(false);

  const isSuperAdmin = session?.user?.role === 'SUPERADMIN';

  useEffect(() => {
    if (status === 'authenticated' && !isSuperAdmin) {
      router.push('/products/quest/dashboard');
    }
  }, [status, isSuperAdmin, router]);

  // Cargar estadísticas
  useEffect(() => {
    if (!isSuperAdmin) return;

    setLoading(true);
    fetch(`/api/analytics/stats?period=${period}`, {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || 'Error al cargar analytics');
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(err => {
        console.error('Error loading analytics:', err);
        if (err.message?.includes('autorizado')) {
          router.push('/products/quest/dashboard');
        }
      })
      .finally(() => setLoading(false));
  }, [period, isSuperAdmin, router]);

  // Cargar eventos detallados
  useEffect(() => {
    if (!isSuperAdmin || view !== 'events') return;

    setEventsLoading(true);
    const params = new URLSearchParams({
      period,
      page: currentPage.toString(),
      limit: '50'
    });

    if (selectedUser !== 'all') {
      params.append('user', selectedUser);
    }

    if (selectedEventType !== 'all') {
      params.append('eventType', selectedEventType);
    }

    fetch(`/api/analytics/events?${params.toString()}`, {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) throw new Error('Error al cargar eventos');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setEvents(data.events);
          setTotalPages(data.pagination.totalPages);
        }
      })
      .catch(err => console.error('Error loading events:', err))
      .finally(() => setEventsLoading(false));
  }, [period, selectedUser, selectedEventType, currentPage, isSuperAdmin, view]);

  // Cargar usuarios para gestión
  useEffect(() => {
    if (!isSuperAdmin || view !== 'users') return;

    setUsersLoading(true);
    fetch('/api/users/manage', {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) throw new Error('Error al cargar usuarios');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setUsers(data.users);
        }
      })
      .catch(err => console.error('Error loading users:', err))
      .finally(() => setUsersLoading(false));
  }, [isSuperAdmin, view]);

  // Funciones de gestión de usuarios
  const generateSecurePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const handleResetPassword = async () => {
    if (!selectedUserForReset || !newPassword) return;

    setResetting(true);
    try {
      const res = await fetch('/api/users/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId: selectedUserForReset.id,
          newPassword
        })
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Contraseña actualizada",
          description: `Se actualizó la contraseña para ${selectedUserForReset.email}`,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar la contraseña",
        variant: "destructive"
      });
    } finally {
      setResetting(false);
    }
  };

  const handleChangeRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'GUEST' : 'ADMIN';

    try {
      const res = await fetch('/api/users/manage', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, newRole })
      });

      const data = await res.json();

      if (data.success) {
        // Actualizar usuario en el estado
        setUsers(users.map(u =>
          u.id === userId ? { ...u, role: newRole } : u
        ));
        toast({
          title: "Rol actualizado",
          description: `Rol cambiado a ${newRole}`,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el rol",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
    toast({
      title: "Copiado",
      description: "Contraseña copiada al portapapeles",
    });
  };

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getEventTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'LOGIN_SUCCESS': 'Login Exitoso',
      'LOGIN_FAILED': 'Login Fallido',
      'LOGOUT': 'Logout',
      'PAGE_VIEW': 'Vista de Página',
      'FILTER_CHANGE': 'Cambio de Filtro',
      'REPORT_GENERATED': 'Reporte Generado',
    };
    return labels[type] || type;
  };

  const getSuccessIcon = (eventType: string, metadata: any) => {
    if (eventType === 'LOGIN_SUCCESS') {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    if (eventType === 'LOGIN_FAILED') {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  // Lista única de usuarios para el filtro
  const usersList = stats?.topUsers.map(u => u.userEmail) || [];

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

        {/* View Selector */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={view === 'summary' ? 'default' : 'outline'}
            onClick={() => setView('summary')}
          >
            Resumen
          </Button>
          <Button
            variant={view === 'events' ? 'default' : 'outline'}
            onClick={() => setView('events')}
          >
            Eventos Detallados
          </Button>
          <Button
            variant={view === 'users' ? 'default' : 'outline'}
            onClick={() => setView('users')}
          >
            Gestión de Usuarios
          </Button>
          <Button
            variant={view === 'data-management' ? 'default' : 'outline'}
            onClick={() => setView('data-management')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Gestión de Datos
          </Button>
        </div>

        {loading && view === 'summary' ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando estadísticas...</p>
          </div>
        ) : view === 'summary' && stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.newUsers} nuevos en el período
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeUsersCount}</div>
                  <p className="text-xs text-muted-foreground">
                    En el período seleccionado
                  </p>
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
                    {stats.reportsByType.map(r => `${r._count} ${r.reportType}`).join(', ')}
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
                  <p className="text-xs text-muted-foreground">
                    Todas las interacciones
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Users by Role & Login Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Usuarios por Rol</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.usersByRole.map(role => (
                      <div key={role.role} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{role.role}</span>
                        <span className="text-2xl font-bold">{role._count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.loginStats.map(stat => (
                      <div key={stat.eventType} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {stat.eventType === 'LOGIN_SUCCESS' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm font-medium">
                            {stat.eventType === 'LOGIN_SUCCESS' ? 'Login Exitoso' : 'Login Fallido'}
                          </span>
                        </div>
                        <span className="text-2xl font-bold">{stat._count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Users & Top Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Top 10 Usuarios Más Activos</CardTitle>
                  <CardDescription>En el período seleccionado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topUsers.map((user, idx) => (
                      <div key={user.userEmail} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted-foreground">#{idx + 1}.</span>
                          <div>
                            <p className="text-sm font-medium">{user.userEmail}</p>
                            <p className="text-xs text-muted-foreground">({user.userRole})</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">{user._count} eventos</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 10 Eventos Más Frecuentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topEvents.map((event, idx) => (
                      <div key={event.eventName} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted-foreground">#{idx + 1}.</span>
                          <span className="text-sm font-medium">{event.eventName}</span>
                        </div>
                        <span className="text-sm font-semibold">{event._count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stats.eventsByType.map(event => (
                    <div key={event.eventType} className="text-center p-4 rounded-lg border">
                      <p className="text-xs text-muted-foreground mb-1">{event.eventType}</p>
                      <p className="text-2xl font-bold">{event._count}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : view === 'events' ? (
          <Card>
            <CardHeader>
              <CardTitle>Registro Detallado de Eventos</CardTitle>
              <CardDescription>
                Historial completo de actividad por usuario
              </CardDescription>

              {/* Filters */}
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los usuarios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los usuarios</SelectItem>
                      {usersList.map(email => (
                        <SelectItem key={email} value={email}>{email}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      <SelectItem value="LOGIN_SUCCESS">Login Exitoso</SelectItem>
                      <SelectItem value="LOGIN_FAILED">Login Fallido</SelectItem>
                      <SelectItem value="LOGOUT">Logout</SelectItem>
                      <SelectItem value="PAGE_VIEW">Vista de Página</SelectItem>
                      <SelectItem value="FILTER_CHANGE">Cambio de Filtro</SelectItem>
                      <SelectItem value="REPORT_GENERATED">Reporte Generado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {eventsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Cargando eventos...</p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha y Hora</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Acción</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Detalles</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map(event => (
                        <TableRow key={event.id}>
                          <TableCell className="font-mono text-xs">
                            {formatDate(event.createdAt)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {event.userEmail || 'Anónimo'}
                          </TableCell>
                          <TableCell>
                            <span className="text-xs px-2 py-1 rounded-full bg-muted">
                              {event.userRole || 'N/A'}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm">
                            {getEventTypeLabel(event.eventType)}
                          </TableCell>
                          <TableCell className="text-sm font-medium">
                            {event.eventName}
                          </TableCell>
                          <TableCell>
                            {getSuccessIcon(event.eventType, event.metadata)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                            {event.metadata ? JSON.stringify(event.metadata) : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Página {currentPage} de {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ) : view === 'users' ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>
                  Administrar usuarios, roles y contraseñas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando usuarios...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Reportes</TableHead>
                        <TableHead>Última Actividad</TableHead>
                        <TableHead>Creado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>{user.name || '-'}</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              user.role === 'SUPERADMIN' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                              user.role === 'ADMIN' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                              'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>{user.reportsGenerated}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {user.lastActivity ? formatDate(user.lastActivity) : 'Nunca'}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString('es-AR')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedUserForReset(user);
                                  setNewPassword('');
                                  setPasswordCopied(false);
                                  setResetPasswordDialog(true);
                                }}
                              >
                                <Key className="h-4 w-4 mr-1" />
                                Resetear
                              </Button>
                              {user.role !== 'SUPERADMIN' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleChangeRole(user.id, user.role)}
                                >
                                  <Shield className="h-4 w-4 mr-1" />
                                  {user.role === 'ADMIN' ? 'A Guest' : 'A Admin'}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Dialog de Reset de Contraseña */}
            <Dialog open={resetPasswordDialog} onOpenChange={setResetPasswordDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Resetear Contraseña</DialogTitle>
                  <DialogDescription>
                    Establece una nueva contraseña para {selectedUserForReset?.email}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <div className="flex gap-2">
                      <Input
                        id="newPassword"
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Ingresa una contraseña (mín. 6 caracteres)"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setNewPassword(generateSecurePassword())}
                      >
                        Generar
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mínimo 6 caracteres. Usa el botón "Generar" para crear una contraseña segura.
                    </p>
                  </div>

                  {newPassword && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Contraseña generada:</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(newPassword)}
                        >
                          {passwordCopied ? (
                            <>
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                      <code className="text-sm font-mono bg-background px-2 py-1 rounded">
                        {newPassword}
                      </code>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setResetPasswordDialog(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleResetPassword}
                    disabled={!newPassword || newPassword.length < 6 || resetting}
                  >
                    {resetting ? 'Actualizando...' : 'Actualizar Contraseña'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : view === 'data-management' ? (
          <div className="space-y-6">
            <EventUploader />
          </div>
        ) : null}
      </div>
    </div>
  );
}
