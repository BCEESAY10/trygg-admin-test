import React, { useState } from 'react';

import type { GetServerSideProps } from 'next';

import Image from 'next/image';

import { UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import ActionDropdown from '@/components/dropdowns/ActionDropdown';
import AdminFilters from '@/components/filters/AdminFilters';
import ErrorState from '@/components/ui/ErrorState';
import { useCreateSubAdmin } from '@/hooks/useCreateSubAdmin';
import { useFetchAdmins } from '@/hooks/useFetchAdmin';
import { useUpdateAdminStatus } from '@/hooks/useUpdateAdminStatus.ts';
import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import CreateSubAdminForm from '@/src/components/forms/subAdminForm';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import StatusBadge from '@/src/components/shared/status';
import ListTable from '@/src/components/ui/ListTable';
import styles from '@/src/styles/sub-admin/SubAdminPage.module.css';
import type { TableColumn } from '@/types/interfaces/admin-layout';
import type {
  SubAdminFormData,
  SubAdmin,
  AdminFilterState,
} from '@/types/interfaces/sub-admin';
import type { PageProps } from '@/types/user';

const SubAdminsPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  const [filters, setFilters] = useState<AdminFilterState>({
    role: '',
  });
  const { data, isLoading, isError, error, refetch } = useFetchAdmins(
    filters.role
  );

  // ==== Get Data from the hooks =====
  const { mutate, isError: adminCreationError, reset } = useCreateSubAdmin();
  const { mutate: updateAdmin } = useUpdateAdminStatus();

  // ==== Create a sub admin =====
  const handleCreateAdmin = (formData: SubAdminFormData) => {
    mutate(formData, {
      onSuccess: data => {
        Swal.fire({
          title: t('admins.success'),
          text: t('admins.created'),
          icon: 'success',
          iconColor: '#30a702',
        });
        console.log(data);
      },
      onError: error => {
        Swal.fire(t('admins.error'), t('admins.failed'), 'error');
        console.log(error);
      },
    });
  };

  //==== Update Sub Admin Status =====
  const handleUpdateStatus = (id: string) => {
    if (adminCreationError) {
      console.log('Error updating status');
    }
    updateAdmin({ id });
  };

  if (isError) {
    return (
      <ErrorState
        title={t('modal.errorOccured')}
        message={error}
        onRetry={refetch}
        retryLabel="Retry"
        showRetryButton
      />
    );
  } else if (adminCreationError) {
    return (
      <ErrorState
        title={t('modal.errorOccured')}
        message={error}
        onRetry={reset}
        retryLabel="Retry"
        showRetryButton
      />
    );
  }

  // ====== Filters ==========
  const handleFilterChange = (key: keyof AdminFilterState, value: string) => {
    if (
      key === 'role' &&
      (value === 'SUPER' || value === 'SUB' || value === '')
    ) {
      setFilters(prev => ({ ...prev, role: value }));
    }
  };

  const handleResetFilters = () => {
    setFilters({ role: '' });
  };

  const subAdminColumns: TableColumn<SubAdmin>[] = [
    {
      key: 'displayId',
      label: t('dashboard.id'),
      render: (_value, _row, index) => <div>{index! + 1}</div>,
    },
    {
      key: 'fullName',
      label: t('admins.name'),
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          >
            <Image
              width={40}
              height={40}
              alt="Admin"
              src={(row.avatar as string) || '/profiles/profile-1.avif'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span style={{ fontWeight: 500, color: '#111827' }}>
            {value as string}
          </span>
        </div>
      ),
    },
    { key: 'email', label: t('admins.email') },
    { key: 'phone', label: t('admins.phone') },
    {
      key: 'status',
      label: 'Status',
      render: value => <StatusBadge status={value as string} />,
    },
    {
      key: 'role',
      label: t('admins.role'),
    },
    {
      key: 'action',
      label: t('admins.action'),
      render: (_, row) => {
        const admin = row as unknown as SubAdmin;
        return (
          <ActionDropdown
            status={admin.status}
            onStatusChange={() => handleUpdateStatus(admin.id)}
          />
        );
      },
    },
  ];

  // ==== Table Data ====
  let content;

  if (isLoading) {
    content = <p>{t('admins.loading')}</p>;
  } else if (isError) {
    content = <p>Error Fetching Admin Data...</p>;
  } else {
    content = (
      <ListTable
        data={data?.data.admins ?? []}
        title={t('admins.admins')}
        columns={subAdminColumns}
      />
    );
  }

  return (
    <DashboardLayout
      role="SUPER"
      title={t('admins.admins')}
      user={user}
      meta={SuperAdminPageMeta.subAdminsPage}
    >
      <div className={styles.sub__admin__page}>
        {/*==================== Two Column Layout ====================*/}
        <div className={styles.two__column__layout}>
          {/*==================== Left Column - Create Form ====================*/}
          <div className={styles.left__column}>
            <CreateSubAdminForm onCreateAdmin={handleCreateAdmin} />
          </div>
          {/*==================== End of Left Column ====================*/}

          {/*==================== Right Column - Sub Admins List ====================*/}
          <div className={styles.right__column}>
            <AdminFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
            <div className={styles.table__container}>
              <div className={styles.table__with__icon}>
                <UserIcon size={20} color="#fbbf24" />
                {content}
              </div>
            </div>
          </div>
          {/*==================== End of Right Column ====================*/}
        </div>
        {/*==================== End of Two Column Layout ====================*/}

        {/*==================== Dynamic Status Change Modal ====================*/}
        {/* <DynamicAdminConfirmModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          actionState={actionState}
          onConfirm={handleStatusChangeConfirm}
        /> */}
        {/*==================== End of Dynamic Status Change Modal ====================*/}
      </div>
    </DashboardLayout>
  );
};

export default SubAdminsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
