import { useEffect } from 'react';
import styles from './Toast.module.css';

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${type === 'success' ? styles.success : styles.error}`}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{type === 'success' ? '✓' : '✗'}</span>
      </div>
      <div className={styles.message}>{message}</div>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Закрити">
        ✕
      </button>
    </div>
  );
}

export default Toast;
