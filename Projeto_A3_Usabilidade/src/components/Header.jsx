// ─────────────────────────────────────────────
// COMPONENTE: Header
// [H1] Exibe em qual página o usuário está
// [H4] Consistente em todas as páginas
// ─────────────────────────────────────────────

import { useContext } from "react";
import { PAGES } from "../constants/index";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "../components/shared/ThemeToggle";
import styles from '../styles/components/header.module.css';

export default function Header({ currentPage }) {
  const { dark } = useContext(ThemeContext);

  const titles = {
    [PAGES.HOME]: "🌌 Foto do Dia",
    [PAGES.MARS]: "🔴 Explorador de Marte",
    [PAGES.ASTEROIDS]: "☄️ Asteroides",
  };

  return (
    <header
      className={styles.header}
      style={{ '--header-bg': dark ? '#0d1023' : '#1a1d2e' }}
    >
      <div className={styles.left}>
        {/* Logo [H4] consistente */}
        <span className={styles.logo} aria-label="NASA Space Explorer">
          🚀 <span className={styles.logoAccent}>Space</span> Explorer
        </span>

        {/* Breadcrumb / título atual [H1] */}
        <span aria-current="page" className={styles.breadcrumb}>
          {titles[currentPage]}
        </span>
      </div>

      <ThemeToggle />
    </header>
  );
}