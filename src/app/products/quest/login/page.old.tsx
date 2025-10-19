'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, UserCircle, Clock, Crown, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [guestAccessExpired, setGuestAccessExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-10-19T23:59:59-03:00');
    const now = new Date();

    if (now >= targetDate) {
      setGuestAccessExpired(true);
    } else {
      const difference = targetDate.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      });
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      router.push('/products/quest/dashboard');
    } else {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push('/products/quest/dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/backgrounds/titulos.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Card
        className="w-full max-w-md shadow-2xl card-hud-effect relative overflow-hidden"
        style={{
          backgroundImage: "url('/backgrounds/cuerpo.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
        <div className="relative z-10">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Image src="/logo/quest.png" alt="Quest Logo" width={80} height={80} />
            </div>
            <CardTitle className="text-3xl font-headline">Quest</CardTitle>
            <CardDescription>Accede a la plataforma de inteligencia electoral</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" size="lg">
              <Lock className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
          </form>

          {!guestAccessExpired && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">O</span>
                </div>
              </div>

              <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                <Clock className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                  ¡Oferta por tiempo limitado!
                </AlertTitle>
                <AlertDescription className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">
                  Acceso como invitado disponible hasta el <strong>19/10/2025</strong>
                  <br />
                  Quedan: <strong>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</strong>
                  <br />
                  <span className="font-semibold">60% OFF</span> si te registras antes del 19/10
                </AlertDescription>
              </Alert>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={handleGuestLogin}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Ingresar como Invitado
              </Button>
            </>
          )}

          {guestAccessExpired && (
            <Alert className="border-red-500 bg-red-50 dark:bg-red-950/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-sm font-semibold text-red-900 dark:text-red-100">
                Acceso como invitado no disponible
              </AlertTitle>
              <AlertDescription className="text-xs text-red-800 dark:text-red-200 mt-1 space-y-2">
                <p>El acceso gratuito expiró el 19 de octubre de 2025.</p>
                <Button
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfIcQTtpjRfEVyI90e_7XrXRS1IJJAdNSjpWgBnSXYKE0ovWg/viewform', '_blank')}
                  className="w-full mt-2 bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Registrarme Ahora
                </Button>
              </AlertDescription>
            </Alert>
          )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
