import type { GetServerSideProps } from 'next';

import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import PassengersPageComponent from '@/src/components/shared/passengers/passengers';
import type { PageProps } from '@/types/user';

const PassengersPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUPER"
      title="Passengers"
      user={user}
      meta={SuperAdminPageMeta.passengersPage}
    >
      <PassengersPageComponent />
    </DashboardLayout>
  );
};

export default PassengersPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
