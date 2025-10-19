// Utility para tracking de eventos de analytics en Quest

export type AnalyticsEventType =
  | 'PAGE_VIEW'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'LOGOUT'
  | 'GUEST_ACCESS'
  | 'FILTER_CHANGE'
  | 'REPORT_GENERATED'
  | 'MAP_INTERACTION'
  | 'POLLSTER_COMPARISON'
  | 'UPGRADE_ATTEMPT'
  | 'ERROR';

interface TrackEventParams {
  eventType: AnalyticsEventType;
  eventName?: string;
  metadata?: Record<string, any>;
}

/**
 * Registra un evento de analytics en el backend
 */
export async function trackEvent({
  eventType,
  eventName,
  metadata = {}
}: TrackEventParams): Promise<boolean> {
  try {
    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        eventName: eventName || eventType,
        metadata,
      }),
    });

    if (!response.ok) {
      console.error('Error al registrar evento:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error al enviar evento de analytics:', error);
    return false;
  }
}

/**
 * Hook para tracking de vistas de página
 */
export function usePageView(pageName: string) {
  if (typeof window !== 'undefined') {
    trackEvent({
      eventType: 'PAGE_VIEW',
      eventName: `page_view_${pageName}`,
      metadata: {
        page: pageName,
        pathname: window.location.pathname,
        referrer: document.referrer,
      },
    });
  }
}

/**
 * Tracking específico para eventos de Quest
 */
export const questAnalytics = {
  // Login/Auth
  loginSuccess: (email: string, isGuest: boolean) =>
    trackEvent({
      eventType: isGuest ? 'GUEST_ACCESS' : 'LOGIN_SUCCESS',
      eventName: isGuest ? 'guest_login' : 'premium_login',
      metadata: { email, isGuest },
    }),

  loginFailed: (email: string, reason?: string) =>
    trackEvent({
      eventType: 'LOGIN_FAILED',
      eventName: 'login_failed',
      metadata: { email, reason },
    }),

  logout: () =>
    trackEvent({
      eventType: 'LOGOUT',
      eventName: 'user_logout',
    }),

  // Filtros
  filterChange: (filterType: 'chamber' | 'pollster' | 'province' | 'timeframe', value: string) =>
    trackEvent({
      eventType: 'FILTER_CHANGE',
      eventName: `filter_${filterType}`,
      metadata: { filterType, value },
    }),

  resetFilters: () =>
    trackEvent({
      eventType: 'FILTER_CHANGE',
      eventName: 'filters_reset',
    }),

  // Mapa
  mapClick: (province: string) =>
    trackEvent({
      eventType: 'MAP_INTERACTION',
      eventName: 'map_province_click',
      metadata: { province },
    }),

  mapHover: (province: string) =>
    trackEvent({
      eventType: 'MAP_INTERACTION',
      eventName: 'map_province_hover',
      metadata: { province },
    }),

  // Reportes
  reportGenerated: (type: 'national' | 'provincial', province?: string) =>
    trackEvent({
      eventType: 'REPORT_GENERATED',
      eventName: `report_${type}`,
      metadata: { type, province },
    }),

  reportPrinted: (type: 'national' | 'provincial', province?: string) =>
    trackEvent({
      eventType: 'REPORT_GENERATED',
      eventName: 'report_printed',
      metadata: { type, province },
    }),

  // Comparación de encuestadoras
  pollsterComparison: (pollsters: string[]) =>
    trackEvent({
      eventType: 'POLLSTER_COMPARISON',
      eventName: 'pollster_comparison_view',
      metadata: { pollsters, count: pollsters.length },
    }),

  // Upgrade
  upgradeModalOpen: () =>
    trackEvent({
      eventType: 'UPGRADE_ATTEMPT',
      eventName: 'upgrade_modal_opened',
    }),

  upgradeFormClick: () =>
    trackEvent({
      eventType: 'UPGRADE_ATTEMPT',
      eventName: 'upgrade_form_clicked',
    }),

  // Errores
  error: (errorMessage: string, context?: string) =>
    trackEvent({
      eventType: 'ERROR',
      eventName: 'application_error',
      metadata: { errorMessage, context },
    }),
};
