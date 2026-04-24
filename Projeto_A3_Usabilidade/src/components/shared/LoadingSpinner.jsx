// [H1] Visibilidade do status — mostra que algo está carregando
// [WCAG 4.1.3] aria-live anuncia para leitores de tela
import styles from '../../styles/components/loadingSpinner.module.css';

export default function LoadingSpinner({ label = "Carregando..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={styles.container}
    >
      <div aria-hidden="true" className={styles.spinner} />
      <p className={styles.label}>{label}</p>
    </div>
  );
}