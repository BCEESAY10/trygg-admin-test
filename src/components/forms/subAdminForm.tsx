import { useState } from 'react';

import Image from 'next/image';

import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/sub-admin/SubAdminForm.module.css';
import type {
  SubAdminFormProps,
  SubAdminFormData,
} from '@/types/interfaces/sub-admin';

const CreateSubAdminForm = ({ onCreateAdmin }: SubAdminFormProps) => {
  const { t } = useTranslation('translation');
  const [formData, setFormData] = useState<SubAdminFormData>({
    fullName: '',
    email: '',
    phone: '',
    avatar: '/profiles/profile-1.avif',
    role: '',
  });

  const handleInputChange = (field: keyof SubAdminFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      // eslint-disable-next-line no-alert
      alert(t('admins.alert'));
      return;
    }

    onCreateAdmin(formData);

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      avatar: '/profiles/profile-1.avif',
      role: '',
    });
  };

  return (
    <div className={styles.form__container}>
      {/*==================== Header ====================*/}
      <h2 className={styles.form__title}>{t('admins.createAdmin')}</h2>
      {/*==================== End of Header ====================*/}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/*==================== Avatar Upload ====================*/}
        <div className={styles.avatar__section}>
          <div className={styles.avatar__wrapper}>
            <Image
              width={80}
              height={80}
              src={formData.avatar}
              alt="Admin Avatar"
              className={styles.avatar__image}
            />
          </div>
        </div>
        {/*==================== End of Avatar Upload ====================*/}

        {/*==================== Form Fields ====================*/}
        <div className={styles.form__fields}>
          {/*==================== Full Name ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('admins.fullName')}
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              placeholder="John Migurdia"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Full Name ====================*/}

          {/*==================== Email ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>{t('admins.email')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              placeholder="example@gmail.com"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Email ====================*/}

          {/*==================== Phone Number ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>{t('admins.phone')}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              placeholder="+46 70 123 45 67"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Phone Number ====================*/}

          {/*==================== Role ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>{t('admins.role')}</label>
            <select
              value={formData.role}
              onChange={e => handleInputChange('role', e.target.value)}
              className={styles.field__input}
            >
              <option value="">{t('admins.selectRole')}</option>
              <option value="SUB">{t('admins.sub')}</option>
              <option value="SUPER">{t('admins.super')}</option>
            </select>
          </div>
          {/*==================== End of Role ====================*/}
        </div>
        {/*==================== End of Form Fields ====================*/}

        {/*==================== Submit Button ====================*/}
        <button
          type="submit"
          disabled={!formData.role}
          className={styles.submit__button}
        >
          {t('admins.createAdmin')}
        </button>
        {/*==================== End of Submit Button ====================*/}
      </form>
    </div>
  );
};

export default CreateSubAdminForm;
