// ─────────────────────────────────────────────
// COMPONENTE: SkipLink
// [WCAG 2.4.1] Permite pular direto ao conteúdo principal
// ─────────────────────────────────────────────
import styles from '../../styles/components/skipLink.module.css';

export default function SkipLink() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Pular para o conteúdo principal
    </a>
  );
}