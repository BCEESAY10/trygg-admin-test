import { useMutation } from '@tanstack/react-query';

import { createSubAdmin } from '@/lib/api/subadmin';
import type { SubAdmin, SubAdminFormData } from '@/types/interfaces/sub-admin';

export const useCreateSubAdmin = () => {
  return useMutation<SubAdmin, Error, SubAdminFormData>({
    mutationFn: createSubAdmin,
  });
};
