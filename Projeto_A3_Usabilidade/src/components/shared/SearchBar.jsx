// ─────────────────────────────────────────────
// COMPONENTE: SearchBar
// [H5] Prevenção de erros — só busca ao ter ≥ 3 chars
// [H1] Status inline: "X resultado(s) encontrado(s)"
// ─────────────────────────────────────────────

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from '../../styles/components/searchBar.module.css';

export default function SearchBar({ value, onChange, resultCount, loading }) {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      style={{
        '--input-bg': dark ? '#0d1023' : '#fff',
        '--input-border': dark ? '#2a2f4a' : '#c5cfe0',
      }}
    >
      <label htmlFor="search" className={styles.label}>
        Buscar por nome
      </label>

      <div className={styles.inputWrapper}>
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex: Perseverance, Martian..."
          className={styles.input}
        />
        {/* [H1] Ícone de loading no input */}
        {loading && (
          <span aria-hidden="true" className={styles.loadingIcon}>⏳</span>
        )}
      </div>

      {/* [H1] Status de resultado (aria-live para leitores de tela) */}
      <p aria-live="polite" aria-atomic="true" className={styles.status}>
        {resultCount !== null
          ? resultCount === 0
            ? "Nenhum resultado encontrado."
            : `${resultCount} resultado${resultCount !== 1 ? "s" : ""} encontrado${resultCount !== 1 ? "s" : ""} — Clique no card para expandir e traduzir!`
          : ""}
      </p>
    </div>
  );
}