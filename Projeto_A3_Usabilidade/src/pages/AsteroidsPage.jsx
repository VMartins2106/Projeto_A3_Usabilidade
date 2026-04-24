// ─────────────────────────────────────────────
// PÁGINA: AsteroidsPage — Near Earth Objects
// [H1] Resumo visual dos dados
// [H5] Prevenção de erros — validação de range antes da requisição
// [H7] Filtros de data flexíveis
// [H8] Tabela minimalista
// [H9] Mensagem de erro clara antes de chamar a API
// [H2] Linguagem humana — "Sim/Não" em vez de "true/false"
// ─────────────────────────────────────────────

import { useState, useContext } from "react";
import { NASA_KEY, BASE_URL } from "../constants/index";
import { ThemeContext } from "../context/ThemeContext";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import Badge from "../components/shared/Badge";
import styles from '../styles/pages/asteroidsPage.module.css';

export default function AsteroidsPage() {
  const { dark } = useContext(ThemeContext);

  const fmt = (d) => d.toISOString().split("T")[0];
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [start, setStart] = useState(fmt(today));
  const [end, setEnd] = useState(fmt(tomorrow));
  const [rangeError, setRangeError] = useState("");

  // [H5] Validação de intervalo antes da requisição
  const validateRange = (s, e) => {
    const diff = (new Date(e) - new Date(s)) / 86400000;
    if (diff < 0) return setRangeError("A data final deve ser após a inicial.");
    if (diff > 7) return setRangeError("O intervalo máximo é de 7 dias (limite da API).");
    setRangeError("");
  };

  const validRange = !rangeError && start && end;
  const url = validRange
    ? `${BASE_URL}/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${NASA_KEY}`
    : null;

  const { data, loading, error } = useFetch(url);

  const allAsteroids = data ? Object.values(data.near_earth_objects).flat() : [];
  const hazardous = allAsteroids.filter((a) => a.is_potentially_hazardous_asteroid);
  const safe = allAsteroids.filter((a) => !a.is_potentially_hazardous_asteroid);

  // CSS custom properties para tema
  const themeVars = {
    '--input-bg': dark ? '#0d1023' : '#fff',
    '--input-border': dark ? '#2a2f4a' : '#c5cfe0',
    '--card-bg': dark ? '#161929' : '#fff',
    '--card-border': dark ? '#2a2f4a' : '#dde3f0',
    '--thead-bg': dark ? '#111525' : '#f0f2fa',
  };

  return (
    <section aria-labelledby="neo-title" style={themeVars}>
      <h1 id="neo-title" className={styles.title}>
        ☄️ Asteroides Próximos à Terra
      </h1>

      {/* Filtros de data [H7, H5] */}
      <div className={styles.filters}>
        <div>
          <label htmlFor="start-date" className={styles.label}>Data inicial</label>
          <input
            id="start-date"
            type="date"
            value={start}
            onChange={(e) => { setStart(e.target.value); validateRange(e.target.value, end); }}
            className={styles.dateInput}
          />
        </div>
        <div>
          <label htmlFor="end-date" className={styles.label}>Data final</label>
          <input
            id="end-date"
            type="date"
            value={end}
            onChange={(e) => { setEnd(e.target.value); validateRange(start, e.target.value); }}
            className={styles.dateInput}
          />
        </div>
      </div>

      {/* [H5, H9] Erro de validação antes da requisição */}
      {rangeError && (
        <div role="alert" className={styles.rangeError}>
          ⚠️ {rangeError}
        </div>
      )}

      {loading && <LoadingSpinner label="Buscando asteroides..." />}
      {error && <ErrorMessage message={error} />}

      {data && !loading && (
        <>
          {/* [H1] Cards de resumo */}
          <div className={styles.statsGrid}>
            {[
              { label: "Total de objetos", value: allAsteroids.length, color: "#3b5bdb" },
              { label: "Potencialmente perigosos", value: hazardous.length, color: "#cf1322" },
              { label: "Seguros", value: safe.length, color: "#2d9a5f" },
            ].map(({ label, value, color }) => (
              <div key={label} className={styles.statCard}>
                <p
                  className={styles.statValue}
                  style={{ '--stat-color': color }}
                  aria-label={`${value} ${label}`}
                >
                  {value}
                </p>
                <p className={styles.statLabel}>{label}</p>
              </div>
            ))}
          </div>
          <p id="date-hint-1" className={styles.hint}>(km = kilometros / s = segundos )</p>
          {/* Tabela [H8] */}
          <div className={styles.tableWrapper}>
            <table
              className={styles.table}
              aria-label="Lista de asteroides próximos à Terra"
            >
              <thead className={styles.thead}>
                <tr>
                  {["Nome", "Diâmetro estimado (km)", "Velocidade (km/s)", "Perigoso?"].map((h) => (
                    <th key={h} scope="col" className={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allAsteroids.slice(0, 30).map((a) => {
                  const dMin = a.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2);
                  const dMax = a.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
                  const vel = parseFloat(
                    a.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0
                  ).toFixed(2);
                  const dangerous = a.is_potentially_hazardous_asteroid;

                  return (
                    <tr
                      key={a.id}
                      className={styles.tr}
                      style={{
                        '--row-bg': dangerous
                          ? dark ? 'rgba(207,19,34,0.08)' : 'rgba(207,19,34,0.04)'
                          : 'transparent',
                      }}
                    >
                      <td className={styles.tdBold}>{a.name.replace(/[()]/g, "")}</td>
                      <td className={styles.tdMuted}>{dMin} – {dMax}</td>
                      <td className={styles.tdMuted}>{vel}</td>
                      <td className={styles.td}>
                        {/* [H2] Linguagem clara: não "true/false" */}
                        <Badge color={dangerous ? "#cf1322" : "#2d9a5f"}>
                          {dangerous ? "Sim ⚠️" : "Não"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {allAsteroids.length > 30 && (
            <p className={styles.pagination}>
              Exibindo 30 de {allAsteroids.length} objetos.
            </p>
          )}
        </>
      )}
    </section>
  );
}