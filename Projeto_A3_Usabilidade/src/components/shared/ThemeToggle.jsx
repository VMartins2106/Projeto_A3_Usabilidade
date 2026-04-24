// ─────────────────────────────────────────────
// COMPONENTE: ThemeToggle
// [H3] Controle do usuário
// [WCAG 2.1.1] Acessível por teclado
// ─────────────────────────────────────────────

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from '../../styles/components/themeToggle.module.css';

export default function ThemeToggle() {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={dark ? "Modo claro" : "Modo escuro"}
      className={styles.button}
    >
      {dark ? "☀️" : "🌙"}
      <span className={styles.label}>{dark ? "Claro" : "Escuro"}</span>
    </button>
  );
}