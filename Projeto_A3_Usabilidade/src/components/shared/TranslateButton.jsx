// [H3] Controle do usuário — tradução sob demanda
// [H6] Reconhecimento — ícone + rótulo claros
import styles from '../../styles/components/translateButton.module.css';

export default function TranslateButton({ onTranslate, loading, translated }) {
  return (
    <button
      onClick={onTranslate}
      disabled={loading}
      aria-label={translated ? "Voltar para inglês" : "Traduzir para português"}
      title={translated ? "Voltar para inglês" : "Traduzir para português"}
      className={`${styles.button} ${translated ? styles.translated : ""}`}
    >
      {loading ? (
        <>⏳ <span>Traduzindo...</span></>
      ) : translated ? (
        <>🇧🇷 <span>Voltar ao inglês</span></>
      ) : (
        <>🌐 <span>Traduzir</span></>
      )}
    </button>
  );
}