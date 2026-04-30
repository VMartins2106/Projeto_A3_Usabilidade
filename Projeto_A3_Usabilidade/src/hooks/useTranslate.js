// ─────────────────────────────────────────────
// HOOK: useTranslate
// Traduz texto via Claude API sob demanda
// [H3] Controle do usuário — só traduz quando solicitado
// ─────────────────────────────────────────────

import { useState } from "react";

// Divide texto em chunks de até 500 chars quebrando em frases
const splitText = (text, maxLength = 450) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length <= maxLength) {
      current += sentence;
    } else {
      if (current) chunks.push(current.trim());
      current = sentence;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
};

const translateChunk = async (text) => {
  const encoded = encodeURIComponent(text);
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|pt-BR`
  );
  const data = await res.json();
  return data.responseData?.translatedText || text;
};

const translateText = async (text) => {
  if (text.length <= 450) return translateChunk(text);
  const chunks = splitText(text);
  const translated = await Promise.all(chunks.map(translateChunk));
  return translated.join(" ");
};

export function useTranslate() {
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState({});
  const [active, setActive] = useState(false); // [H3] controla se está mostrando tradução

  const reset = () => {
    setTranslations({});
    setLoading({});
    setActive(false);
  };

  const translate = async (keys, texts) => {
    // Se já traduzido, apenas alterna exibição [H3]
    if (active && Object.keys(translations).length > 0) {
      setActive(false);
      return;
    }
    if (!active && Object.keys(translations).length > 0) {
      setActive(true);
      return;
    }

    // Primeira tradução
    const pairs = Array.isArray(keys) ? keys.map((k, i) => [k, texts[i]]) : [[keys, texts]];
    const pending = pairs.filter(([k]) => !translations[k] && !loading[k]);
    if (!pending.length) return;

    pending.forEach(([k]) =>
      setLoading((prev) => ({ ...prev, [k]: true }))
    );

    try {
      await Promise.all(
        pending.map(async ([k, text]) => {
          const translated = await translateText(text);
          setTranslations((prev) => ({ ...prev, [k]: translated }));
          setLoading((prev) => ({ ...prev, [k]: false }));
        })
      );
      setActive(true);
    } catch {
      pending.forEach(([k, text]) => {
        setTranslations((prev) => ({ ...prev, [k]: text }));
        setLoading((prev) => ({ ...prev, [k]: false }));
      });
    }
  };

  // Retorna tradução ou original dependendo do estado active
  const getText = (key, original) =>
    active && translations[key] ? translations[key] : original;

  const isLoading = (key) => !!loading[key];
  const isTranslated = (key) => active && !!translations[key];

  return { translate, getText, isLoading, isTranslated, reset, active };
}