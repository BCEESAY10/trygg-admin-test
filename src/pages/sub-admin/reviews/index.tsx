import type { GetServerSideProps } from 'next';

import { protectSubAdminPage } from '@/lib/server/protect-page';
import { AdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import ReviewsPageComponent from '@/src/components/shared/reviews/reviews-page';
import type { PageProps } from '@/types/user';

const ReviewsPage = ({ user }: PageProps) => {
  return (
    <DashboardLayout
      role="SUB"
      title="Reviews & Feedback"
      user={user}
      meta={AdminPageMeta.reviewsPage}
    >
      <ReviewsPageComponent />
    </DashboardLayout>
  );
};

export default ReviewsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSubAdminPage(context);
};
