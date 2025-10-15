'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, Crown } from 'lucide-react';

interface GuestAccessBannerProps {
  onUpgradeClick: () => void;
}

export function GuestAccessBanner({ onUpgradeClick }: GuestAccessBannerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-10-19T23:59:59-03:00'); // 19 de octubre 2025, Argentina timezone

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 mb-6">
      <Clock className="h-5 w-5 text-yellow-600" />
      <AlertTitle className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
        {isExpired ? '¡El acceso gratuito ha expirado!' : '¡Oferta por tiempo limitado!'}
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        {!isExpired ? (
          <>
            <p className="text-yellow-800 dark:text-yellow-200">
              El acceso como invitado expira el <strong>19 de octubre de 2025</strong>.
            </p>
            <div className="flex items-center gap-4 text-2xl font-bold text-yellow-900 dark:text-yellow-100">
              <div className="flex flex-col items-center">
                <span>{timeLeft.days}</span>
                <span className="text-xs font-normal text-yellow-700 dark:text-yellow-300">días</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-xs font-normal text-yellow-700 dark:text-yellow-300">horas</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-xs font-normal text-yellow-700 dark:text-yellow-300">min</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-xs font-normal text-yellow-700 dark:text-yellow-300">seg</span>
              </div>
            </div>
            <p className="text-yellow-800 dark:text-yellow-200 font-semibold">
              🎉 <strong>60% OFF</strong> en tu suscripción Premium hasta el 19/10
            </p>
          </>
        ) : (
          <p className="text-yellow-800 dark:text-yellow-200">
            El acceso como invitado ya no está disponible. Registrate para acceder a Quest.
          </p>
        )}
        <Button
          onClick={onUpgradeClick}
          className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          <Crown className="mr-2 h-4 w-4" />
          {isExpired ? 'Registrarme Ahora' : 'Obtener 60% OFF'}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
