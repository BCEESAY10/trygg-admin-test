import type { GetServerSideProps } from 'next';

import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import ReviewsPageComponent from '@/src/components/shared/reviews/reviews-page';
import type { PageProps } from '@/types/user';

const ReviewsPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUPER"
      title="Reviews & Feedback"
      user={user}
      meta={SuperAdminPageMeta.reviewsPage}
    >
      <ReviewsPageComponent />
    </DashboardLayout>
  );
};

export default ReviewsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
