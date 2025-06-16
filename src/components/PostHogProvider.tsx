
import { useEffect } from 'react';
import posthog from 'posthog-js';

interface PostHogProviderProps {
  children: React.ReactNode;
}

const PostHogProvider = ({ children }: PostHogProviderProps) => {
  useEffect(() => {
    const projectKey = 'phc_7oLgK8uUlCNJFtbqKQHQsNVYrTmJ7Q5jYF8GZkSBKjL';
    
    if (typeof window !== 'undefined' && projectKey) {
      posthog.init(projectKey, {
        api_host: 'https://app.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        loaded: (posthog) => {
          console.log('PostHog loaded successfully');
        }
      });
    }

    return () => {
      posthog.reset();
    };
  }, []);

  return <>{children}</>;
};

export default PostHogProvider;
