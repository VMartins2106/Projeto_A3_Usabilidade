// ─────────────────────────────────────────────
// COMPONENTE: ErrorMessage
// [H9] Ajuda o usuário a entender e se recuperar do erro
// [H2] Linguagem humana, sem códigos técnicos expostos
// ─────────────────────────────────────────────

import styles from '../../styles/components/errorMessage.module.css';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={styles.container}
    >
      <div aria-hidden="true" className={styles.icon}>🛰️</div>

      <h2 className={styles.title}>Houston, temos um problema</h2>

      {/* [H9] Mensagem clara e acionável */}
      <p className={styles.message}>{message}</p>

      {onRetry && (
        /* [H3] Controle do usuário: pode tentar novamente */
        <button onClick={onRetry} className={styles.retryButton}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}