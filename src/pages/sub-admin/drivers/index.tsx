import type { GetServerSideProps } from 'next';

import { protectSubAdminPage } from '@/lib/server/protect-page';
import { AdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import DriversPageComponent from '@/src/components/shared/drivers/drivers';
import type { PageProps } from '@/types/user';

const DriversPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUB"
      user={user}
      title="Drivers"
      meta={AdminPageMeta.driversPage}
    >
      <DriversPageComponent />
    </DashboardLayout>
  );
};

export default DriversPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSubAdminPage(context);
};
