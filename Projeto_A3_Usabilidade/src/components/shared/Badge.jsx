// ─────────────────────────────────────────────
// COMPONENTE: Badge
// [H8] Elemento visual minimalista de categorização
// ─────────────────────────────────────────────

import styles from '../../styles/components/badge.module.css';

export default function Badge({ children, color = "#3b5bdb" }) {
  return (
    <span
      className={styles.badge}
      style={{
        '--badge-bg': color + '22',
        '--badge-color': color,
        '--badge-border': color + '44',
      }}
    >
      {children}
    </span>
  );
}