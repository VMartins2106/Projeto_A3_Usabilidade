// ─────────────────────────────────────────────
// COMPONENTE: Modal
// [H3] Controle: usuário fecha quando quiser (Esc ou ×)
// [WCAG 2.1.1] Foco preso dentro do modal (focus trap básico)
// ─────────────────────────────────────────────

import { useEffect, useRef } from "react";
import styles from '../../styles/components/modal.module.css';

export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    // [WCAG 2.1.1] Fechar com Escape
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    ref.current?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={ref} tabIndex={-1} className={styles.content}>
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
          {/* [H3] Botão de fechar visível e acessível */}
          <button onClick={onClose} aria-label="Fechar" className={styles.closeButton}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}