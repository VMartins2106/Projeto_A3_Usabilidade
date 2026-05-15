import { useEffect, useState } from "react";
import styles from "../../styles/components/VideoEmbed.module.css";

export default function VideoEmbed({ url, title }) {
  const [showFallback, setShowFallback] = useState(false);

  const externalUrl = url.includes("youtube.com/embed/")
  ? url
      .split("?")[0]
      .replace("embed/", "watch?v=")      
  : url;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [url]);

  // Após 5 segundos → fallback externo
  if (showFallback) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <span
            aria-hidden="true"
            className={styles.icon}
          >
            🎬
          </span>

          <p className={styles.videoTitle}>
            {title}
          </p>

          <p className={styles.hint}>
            Falha ao carregar o vídeo. Para visualizar clique no link abaixo!
          </p>

          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Assistir no site original ↗
          </a>
        </div>
      </div>
    );
  }

  // Spinner por 5 segundos
  return (
    <div className={styles.container}>
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner}></div>

        <p className={styles.loadingText}>
          Tentando carregar vídeo...
        </p>
      </div>

      <iframe
        src={url}
        title={title}
        className={styles.hiddenIframe}
        allowFullScreen
      />
    </div>
  );
}