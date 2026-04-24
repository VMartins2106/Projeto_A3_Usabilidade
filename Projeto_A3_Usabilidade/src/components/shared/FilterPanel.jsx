// ─────────────────────────────────────────────
// COMPONENTE: FilterPanel
// [H7] Flexibilidade e eficiência — filtros para usuários avançados
// [H5] Prevenção de erros — valores padrão seguros
// ─────────────────────────────────────────────

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from '../../styles/components/filterPanel.module.css';

export default function FilterPanel({ camera, setCamera, sol, setSol }) {
  const { dark } = useContext(ThemeContext);

  // [H2] Nomes das câmeras em linguagem humana
  const cameras = [
    { value: "", label: "Todas as câmeras" },
    { value: "fhaz", label: "Câmera frontal de risco" },
    { value: "rhaz", label: "Câmera traseira de risco" },
    { value: "mast", label: "Câmera Mastcam" },
    { value: "chemcam", label: "ChemCam" },
    { value: "navcam", label: "NavCam" },
  ];

  return (
    /* [H7] Painel de filtros avançados */
    <section
      aria-label="Filtros de busca"
      className={styles.panel}
      style={{
        '--panel-bg': dark ? '#111525' : '#eef0f8',
        '--input-bg': dark ? '#0d1023' : '#fff',
        '--input-border': dark ? '#2a2f4a' : '#c5cfe0',
      }}
    >
      <div>
        {/* [H6] Rótulo visível — não depende só de placeholder */}
        <label htmlFor="sol-input" className={styles.label}>
          Sol (dia marciano)
        </label>
        <input
          id="sol-input"
          type="number"
          min={1}
          max={4000}
          value={sol}
          onChange={(e) => {
            const v = Number(e.target.value);
            // [H5] Prevenção de erros: validação em tempo real
            if (v >= 1 && v <= 4000) setSol(v);
          }}
          className={styles.input}
          aria-describedby="sol-hint"
        />
        {/* [H10] Dica inline */}
        <p id="sol-hint" className={styles.hint}>1 – 4000</p>
      </div>

      <div>
        <label htmlFor="camera-select" className={styles.label}>
          Câmera
        </label>
        <select
          id="camera-select"
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          className={styles.input}
        >
          {cameras.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
    </section>
  );
}