'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, Crown, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { questAnalytics } from '@/lib/analytics';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'GUEST_EXPIRED') {
          setError('Tu acceso de invitado ha expirado. Contáctanos para obtener acceso premium.');
          questAnalytics.loginFailed(email, 'guest_expired');
        } else {
          setError('Credenciales incorrectas. Verifica tu email y contraseña.');
          questAnalytics.loginFailed(email, 'invalid_credentials');
        }
      } else {
        // Login exitoso
        questAnalytics.loginSuccess(email, false);
        router.push('/products/quest/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
      questAnalytics.error('Login error', 'login_page');
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                <Lock className="mr-2 h-4 w-4" />
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿No tienes acceso premium?
              </p>
              <Button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfIcQTtpjRfEVyI90e_7XrXRS1IJJAdNSjpWgBnSXYKE0ovWg/viewform', '_blank')}
                variant="outline"
                className="w-full"
              >
                <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                Solicitar Acceso Premium
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
