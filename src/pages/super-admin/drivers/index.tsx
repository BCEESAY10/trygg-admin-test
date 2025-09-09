import type { GetServerSideProps } from 'next';

import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import DriversPageComponent from '@/src/components/shared/drivers/drivers';
import type { PageProps } from '@/types/user';

const DriversPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUPER"
      title="Drivers"
      user={user}
      meta={SuperAdminPageMeta.driversPage}
    >
      <DriversPageComponent />
    </DashboardLayout>
  );
};

export default DriversPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
