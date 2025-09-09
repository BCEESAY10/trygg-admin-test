import { useQuery } from '@tanstack/react-query';

import { fetchDriverStats } from '@/lib/api/driver';

export const useDriverStats = () => {
  return useQuery({
    queryKey: ['driverStats'],
    queryFn: fetchDriverStats,
  });
};
