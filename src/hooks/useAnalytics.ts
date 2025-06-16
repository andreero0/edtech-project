
import { useCallback } from 'react';
import posthog from 'posthog-js';

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties);
    }
  }, []);

  const trackPageView = useCallback((pageName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview', { page: pageName, ...properties });
    }
  }, []);

  const identifyUser = useCallback((userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, properties);
    }
  }, []);

  return {
    trackEvent,
    trackPageView,
    identifyUser,
  };
};
