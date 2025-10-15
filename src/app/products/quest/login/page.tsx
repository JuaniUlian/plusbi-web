'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, UserCircle } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={handleGuestLogin}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            Ingresar como Invitado
          </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
