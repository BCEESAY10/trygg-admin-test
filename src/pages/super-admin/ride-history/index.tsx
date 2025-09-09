import type { GetServerSideProps } from 'next';

import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import RideHistoryPageComponent from '@/src/components/shared/ride-history/ride-history';
import type { PageProps } from '@/types/user';

const rideHistoryPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUPER"
      title="Ride History"
      user={user}
      meta={SuperAdminPageMeta.rideHistoryPage}
    >
      <RideHistoryPageComponent />
    </DashboardLayout>
  );
};

export default rideHistoryPage;
export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
