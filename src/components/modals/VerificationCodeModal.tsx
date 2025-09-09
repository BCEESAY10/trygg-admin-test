import { useState } from 'react';

import { useRouter } from 'next/router';

import axios from 'axios';
import { X, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/modals/VerificationCodeModal.module.css';
import type { VerificationCodeModalProps } from '@/types/interfaces/modal';
import { getErrorMessage } from '@/utils/error';
import { showAlert } from '@/utils/sweet-alert';

const VerificationCodeModal = ({
  isOpen,
  onClose,
  email,
  userId,
}: VerificationCodeModalProps) => {
  const { t } = useTranslation('translation');
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const router = useRouter();

  if (!isOpen) return null;

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = codes.join('');
    if (code.length !== 6) return;

    setIsVerifying(true);

    try {
      const { data } = await axios.post('/api/verify-otp', {
        code,
        userId,
      });

      showAlert({
        title: t('login.success'),
        text: t('login.successText'),
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: t('login.ok'),
        timer: 3000,
        timerProgressBar: true,
      });

      if (data.role === 'SUB') {
        router.push('/sub-admin');
      } else if (data.role === 'SUPER') {
        router.push('/super-admin');
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      setCodes(['', '', '', '', '', '']);
      showAlert({
        title: t('login.failed'),
        text: message,
        icon: 'error',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setCodes(['', '', '', '', '', '']);

    try {
      await axios.post('/api/request-otp', {
        email,
      });

      showAlert({
        title: t('login.codeSent'),
        text: t('login.resentText'),
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: t('login.ok'),
      });
    } catch (error) {
      const { message } = getErrorMessage(error);
      showAlert({
        title: t('modal.error'),
        text: message,
        icon: 'error',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {/*==================== Modal Backdrop ====================*/}
      <div className={styles.backdrop} onClick={onClose}>
        {/*==================== Modal Container ====================*/}
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          {/*==================== Modal Header ====================*/}
          <div className={styles.header}>
            <h2 className={styles.title}>{t('login.enterCode')}</h2>
            <button onClick={onClose} className={styles.close__button}>
              <X size={20} color="#6b7280" />
            </button>
          </div>
          {/*==================== End of Modal Header ====================*/}

          {/*==================== Modal Content ====================*/}
          <div className={styles.content}>
            <div className={styles.icon__wrapper}>
              <Mail size={48} color="#ffc107" />
            </div>

            <div className={styles.description}>
              <p className={styles.description__text}>
                {t('login.sentCode')} <strong>{email}</strong>
              </p>
            </div>

            <form className={styles.form}>
              <div className={styles.code__inputs}>
                {codes.map((code, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`code-input-${index}`}
                    maxLength={1}
                    value={code}
                    onChange={e => handleInputChange(index, e.target.value)}
                    className={styles.code__input}
                    disabled={isVerifying}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isVerifying || codes.join('').length !== 6}
                className={styles.verify__button}
              >
                {isVerifying ? t('login.verifying') : t('login.verify')}
              </button>
            </form>

            <div className={styles.resend__section}>
              <p className={styles.resend__text}>{t('login.noCode')}</p>
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className={styles.resend__button}
              >
                {isResending ? t('login.resending') : t('login.resend')}
              </button>
            </div>
          </div>
          {/*==================== End of Modal Content ====================*/}
        </div>
        {/*==================== End of Modal Container ====================*/}
      </div>
      {/*==================== End of Modal Backdrop ====================*/}
    </>
  );
};

export default VerificationCodeModal;
