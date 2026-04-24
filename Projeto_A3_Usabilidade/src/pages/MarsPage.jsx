// ─────────────────────────────────────────────
// PÁGINA: MarsPage — NASA Image Library (Mars)
// [H1] Status de busca em tempo real
// [H7] Flexibilidade — busca livre por termos
// [H8] Grid minimalista de cards
// [H9] Estado vazio com orientação clara
// ─────────────────────────────────────────────

// Rovers e missões

//curiosity — rover mais fotografado, ativo desde 2012
//perseverance — rover mais moderno, desde 2021
//opportunity — rover que operou por 15 anos
//spirit — primeiro rover de superfície

//Locais e geologia

//mars crater — crateras marcianas
//mars landscape — paisagens gerais
//mars rock — formações rochosas
//mars dust storm — tempestades de poeira

//Equipamentos

//mars helicopter — Ingenuity, o primeiro helicóptero em Marte
//mars sample — amostras coletadas
//mars soil — solo marciano

//Missões orbitais

//mars orbiter — imagens do espaço
//mars atmosphere — atmosfera

import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import SearchBar from "../components/shared/SearchBar";
import Modal from "../components/shared/Modal";
import styles from '../styles/pages/marsPage.module.css';

const IMAGES_URL = "https://images-api.nasa.gov";

export default function MarsPage() {
  const { dark } = useContext(ThemeContext);
  const [search, setSearch] = useState("mars rover");
  const [selected, setSelected] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const debouncedSearch = useDebounce(search, 600);

  const url = debouncedSearch
    ? `${IMAGES_URL}/search?q=${encodeURIComponent(debouncedSearch)}&media_type=image&page_size=24`
    : null;

  const { data, loading, error } = useFetch(url);
  const items = data?.collection?.items || [];

  const handleCardClick = async (item) => {
    setSelected(item);
    try {
      const res = await fetch(item.href);
      const links = await res.json();
      const orig = links.find((l) => l.endsWith("~orig.jpg") || l.endsWith(".jpg"));
      setSelectedMedia(orig || links[0]);
    } catch {
      setSelectedMedia(item.links?.[0]?.href || null);
    }
  };

  const handleClose = () => {
    setSelected(null);
    setSelectedMedia(null);
  };

  return (
    <section aria-labelledby="mars-title">
      <h1 id="mars-title" className={styles.title}>
        🔴 Galeria de Marte — NASA Image Library
      </h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        resultCount={!loading && items.length ? items.length : null}
        loading={loading}
      />

      {loading && <LoadingSpinner label="Buscando imagens da NASA..." />}
      {error && <ErrorMessage message={error} />}

      {/* [H9] Estado vazio com orientação clara */}
      {!loading && !error && items.length === 0 && (
        <div role="status" className={styles.empty}>
          <p className={styles.emptyIcon} aria-hidden="true">🏜️</p>
          <p>Nenhuma imagem encontrada.</p>
          <p className={styles.emptyHint}>
            Tente buscar por "curiosity", "perseverance" ou "mars".
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className={styles.grid}>
          {items.map((item, i) => {
            const meta = item.data?.[0];
            const thumb = item.links?.[0]?.href;
            return (
              <article
                key={meta?.nasa_id || i}
                onClick={() => handleCardClick(item)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleCardClick(item)}
                aria-label={`Ver detalhes: ${meta?.title}`}
                className={styles.card}
                style={{
                  '--card-bg': dark ? '#161929' : '#fff',
                  '--card-border': dark ? '#2a2f4a' : '#dde3f0',
                }}
              >
                {thumb && (
                  <img
                    src={thumb}
                    alt={meta?.title || "Imagem NASA"}
                    loading="lazy"
                    className={styles.cardImage}
                  />
                )}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{meta?.title}</h3>
                  <p className={styles.cardDate}>
                    {meta?.date_created?.slice(0, 10)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={handleClose}
        title={selected?.data?.[0]?.title || "Imagem"}
      >
        {selected && (
          <div>
            {selectedMedia ? (
              <img
                src={selectedMedia}
                alt={selected.data?.[0]?.title}
                className={styles.modalImage}
              />
            ) : (
              <LoadingSpinner label="Carregando imagem..." />
            )}
            <p className={styles.modalDescription}>
              {selected.data?.[0]?.description}
            </p>
            <p className={styles.modalMeta}>
              {selected.data?.[0]?.date_created?.slice(0, 10)} · {selected.data?.[0]?.center}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}