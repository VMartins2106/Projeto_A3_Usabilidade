// ─────────────────────────────────────────────
// CONTEXTO DE TEMA (claro / escuro)
// [H3] Controle do usuário: pode alternar o tema
// [WCAG 1.4.3] Respeita preferência do sistema
// ─────────────────────────────────────────────

import { useState, useCallback, createContext } from "react";
import styles from '../styles/context/themeContext.module.css';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const toggle = useCallback(() => setDark((d) => !d), []);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div
        className={styles.wrapper}
        style={{
          '--theme-bg': dark ? '#0b0e1a' : '#f4f6fb',
          '--theme-color': dark ? '#e8ecf4' : '#1a1d2e',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}