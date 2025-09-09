import type {
  DriversResponse,
  DriverStatsResponse,
  GetDriversInput,
  PartialDriver,
} from '@/types/driver';
import type { DriverDetails } from '@/types/interfaces/driver-details';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const fetchDrivers = async ({
  page = 0,
  limit = 15,
  searchTerm,
  ratings,
  status,
}: GetDriversInput): Promise<DriversResponse> => {
  const { data } = await apiClient.get<DriversResponse>(`${BASE_URL}/drivers`, {
    params: { page, limit, q: searchTerm, ratings, status },
  });
  return data;
};

export const getDriverByUserId = async (
  userId: string
): Promise<DriverDetails> => {
  const { data } = await apiClient.get(`${BASE_URL}/users/${userId}`);
  return data.data;
};

export const updateDriverStatus = async ({
  id,
  applicationStatus,
  reason,
}: PartialDriver) => {
  const { data } = await apiClient.patch(
    `${BASE_URL}/drivers/${id}/update-driver-status`,
    {
      applicationStatus,
      reason,
    }
  );
  return data;
};

export const fetchDriverStats = async (): Promise<DriverStatsResponse> => {
  const { data } = await apiClient.get(`${BASE_URL}/drivers/dashboard/stats`);
  return data;
};
