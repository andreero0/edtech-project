
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useRegistrationCount = () => {
  return useQuery({
    queryKey: ['registration-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching registration count:', error);
        throw error;
      }

      return count || 0;
    },
    refetchInterval: 30000, // Refetch every 30 seconds to keep it live
  });
};
