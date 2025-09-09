import type { GetServerSideProps } from 'next';

import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import DashboardPageComponent from '@/src/components/shared/dashboard/dashboard-page-component';
import type { PageProps } from '@/types/user';

const DashboardPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUPER"
      title="Dashboard"
      user={user}
      meta={SuperAdminPageMeta.dashboardPage}
    >
      <DashboardPageComponent />
    </DashboardLayout>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
