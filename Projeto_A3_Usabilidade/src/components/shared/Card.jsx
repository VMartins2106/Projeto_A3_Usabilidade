// ─────────────────────────────────────────────
// COMPONENTE: PhotoCard
// [H8] Design minimalista — imagem + rótulo + data
// [H2] linguagem humana
// [WCAG 1.1.1] Alt em imagens
// [WCAG 2.1.1] Acessível por teclado
// [WCAG 4.1.2] aria-label descritivo
// ─────────────────────────────────────────────

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Badge from "./Badge";
import styles from '../../styles/components/card.module.css';

export default function Card({ image, onClick }) {
  const { dark } = useContext(ThemeContext);
  if (!image) return null;

  return (
    <article
      className={styles.card}
      style={{
        '--card-bg': dark ? '#161929' : '#fff',
        '--card-border': dark ? '#2a2f4a' : '#dde3f0',
      }}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={`Ver detalhes: ${image.title || image.img_src}`}
    >
      {(image.img_src || image.url) && (
        <img
          src={image.img_src || image.url}
          alt={image.title || "Foto espacial da NASA"}
          loading="lazy"
          className={styles.image}
          onError={(e) => {
            e.target.src = "https://images.nasa.gov/images/nasa_meatball_1976.png";
            e.target.alt = "Imagem indisponível";
          }}
        />
      )}

      <div className={styles.body}>
        {image.camera && (
          <Badge color="#3b5bdb">
            {image.camera.full_name || image.camera.name}
          </Badge>
        )}
        {image.title && (
          <h3 className={styles.title}>{image.title}</h3>
        )}
        <p className={styles.date}>
          {image.earth_date || image.date_taken || ""}
        </p>
      </div>
    </article>
  );
}