import type { GetServerSideProps } from 'next';

import { protectSubAdminPage } from '@/lib/server/protect-page';
import { AdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import RideHistoryPageComponent from '@/src/components/shared/ride-history/ride-history';
import type { PageProps } from '@/types/user';

const rideHistoryPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUB"
      title="Ride History"
      user={user}
      meta={AdminPageMeta.rideHistoryPage}
    >
      <RideHistoryPageComponent />
    </DashboardLayout>
  );
};

export default rideHistoryPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSubAdminPage(context);
};
