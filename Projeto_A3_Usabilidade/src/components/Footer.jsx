// ─────────────────────────────────────────────
// COMPONENTE: Footer
// [H4] Consistência; [H10] Créditos e documentação
// ─────────────────────────────────────────────

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styles from '../styles/components/footer.module.css';

export default function Footer() {
  const { dark } = useContext(ThemeContext);

  return (
    <footer
      className={styles.footer}
      style={{ '--footer-border': dark ? '#2a2f4a' : '#dde3f0' }}
    >
      <p>
        Dados fornecidos pela{" "}
        <a
          href="https://api.nasa.gov"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          NASA Open API
        </a>
        {" "}· Projeto de Usabilidade — Heurísticas de Nielsen + WCAG
      </p>
    </footer>
  );
}