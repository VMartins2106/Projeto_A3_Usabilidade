// ─────────────────────────────────────────────
// COMPONENTE: NavBar
// [H4] Consistência — navegação igual em todas as páginas
// [H6] Rótulos + ícones — reconhecimento, não memorização
// [WCAG 2.1.1] Navegável por teclado com Tab
// [WCAG 4.1.2] aria-current na página ativa
// ─────────────────────────────────────────────

import { useContext } from "react";
import { PAGES } from "../constants/index";
import { ThemeContext } from "../context/ThemeContext";
import styles from '../styles/components/navBar.module.css';

export default function NavBar({ current, onChange }) {
  const { dark } = useContext(ThemeContext);

  const items = [
    { id: PAGES.HOME, label: "Foto do Dia", icon: "🌌" },
    { id: PAGES.MARS, label: "Marte", icon: "🔴" },
    { id: PAGES.ASTEROIDS, label: "Asteroides", icon: "☄️" },
  ];

  return (
    <nav
      aria-label="Navegação principal"
      className={styles.nav}
      style={{ '--nav-bg': dark ? '#111525' : '#1e2235' }}
    >
      {items.map(({ id, label, icon }) => {
        const active = current === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-current={active ? "page" : undefined}
            className={`${styles.button} ${active ? styles.active : ""}`}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}