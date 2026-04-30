// ─────────────────────────────────────────────
// PÁGINA: HomePage — APOD (Astronomy Picture of the Day)
// [H1] Visibilidade do status — loading e erro claros
// [H5] Prevenção de erros — range de datas limitado
// [H3] Controle do usuário — modal com zoom
// [WCAG 1.1.1] Alt em imagens
// [WCAG 2.1.1] Teclado
// ─────────────────────────────────────────────

import { useState, useContext, useEffect } from "react";
import { NASA_KEY, BASE_URL } from "../constants/index";
import { ThemeContext } from "../context/ThemeContext";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import Badge from "../components/shared/Badge";
import Modal from "../components/shared/Modal";
import styles from '../styles/pages/homePage.module.css';
import { translateMediaType, formatDatePtBR } from "../utils/translate";

import { useTranslate } from "../hooks/useTranslate";
import TranslateButton from "../components/shared/TranslateButton";

export default function HomePage() {

  // ... estados existentes
  const { translate, getText, isLoading, isTranslated, reset } = useTranslate();

  const handleTranslate = () => {
    translate(
      ["apod-title", "apod-explanation"],
      [data.title, data.explanation]
    );
  };

  const { dark } = useContext(ThemeContext);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    return d.toISOString().split("T")[0];
  });
  const [modalOpen, setModalOpen] = useState(false);

    // Reseta traduções quando a data muda
  useEffect(() => {
    reset();
  }, [date]);

  const url = `${BASE_URL}/planetary/apod?api_key=${NASA_KEY}&date=${date}`;
  const { data, loading, error } = useFetch(url);

  // [H5] Prevenção de erros: limitar seleção de data ao range válido
  const minDate = "1995-06-16";
  const maxDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    return d.toISOString().split("T")[0];
  })();

  return (
    <section aria-labelledby="apod-title">
      <div className={styles.controls}>
        <div>
          <label htmlFor="apod-date" className={styles.label}>
            Data da foto
          </label>
          <input
            id="apod-date"
            type="date"
            value={date}
            min={minDate}
            max={maxDate}
            onChange={(e) => setDate(e.target.value)}
            className={styles.dateInput}
            style={{
              '--input-bg': dark ? '#0d1023' : '#fff',
              '--input-border': dark ? '#2a2f4a' : '#c5cfe0',
            }}
            aria-describedby="date-hint-1 date-hint-2"
          />
          {/* [H10] Dicas inline — corrigido: IDs únicos */}
          <p id="date-hint-1" className={styles.hint}>Disponível desde 16/06/1995</p>
          <p id="date-hint-2" className={styles.hint}>Disponibilização em dia - 1 (até ontem)</p>
        </div>
      </div>

      {loading && <LoadingSpinner label="Buscando foto astronômica..." />}
      {error && <ErrorMessage message={error} />}

      {data && !loading && (
        <div className={styles.grid}>
          {/* Imagem / vídeo */}
          <div>
            {data.media_type === "image" ? (
              <figure className={styles.figure}>
                <img
                  src={data.url}
                  alt={data.title}
                  className={styles.image}
                  onClick={() => setModalOpen(true)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
                  aria-label={`Ampliar imagem: ${data.title}`}
                />
                {/* [H10] Hint de interação */}
                <figcaption className={styles.figcaption}>
                  Clique na imagem para ampliar
                </figcaption>
              </figure>
            ) : (
              <div className={styles.videoWrapper}>
                <iframe
                  src={data.url}
                  title={data.title}
                  className={styles.iframe}
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Texto */}
          <div>
            <Badge color="#e67e00">
              {translateMediaType(data.media_type)}
            </Badge>

              {/* Botão alinhado à direita [H3] */}
              <div className={styles.translateWrapper}>
                {/* Botão de tradução [H3] */}
                <TranslateButton
                  onTranslate={handleTranslate}
                  loading={isLoading("apod-title") || isLoading("apod-explanation")}
                  translated={isTranslated("apod-title")}
                />
              </div>

            <h1 id="apod-title" className={styles.title}>
              {getText("apod-title", data.title)}
            </h1>
            <p className={styles.meta}>
              📅 {formatDatePtBR(data.date)}
              {data.copyright && ` · © ${data.copyright}`}
            </p>
            <p className={styles.explanation}>
              {getText("apod-explanation", data.explanation)}
            </p>
            {data.hdurl && (
              <a
                href={data.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.hdLink}
              >
                Ver em alta resolução ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* Modal de imagem ampliada [H3] */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={getText("apod-title", data?.title || "")}>
        {data?.hdurl && (
          <img src={data.hdurl} alt={getText("apod-title", data.title)} className={styles.modalImage} />
        )}
      </Modal>
    </section>
  );
}