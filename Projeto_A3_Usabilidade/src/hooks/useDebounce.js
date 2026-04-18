// ─────────────────────────────────────────────
// HOOK: useDebounce
// Otimiza inputs de busca [H7]

// Atrasa a execucao para nao disparar requisicoes 
// a cada letra digitada, e sim quando o usuario 
// para de digitar por um tempo (400ms por padrao).

// ─────────────────────────────────────────────

import { useState, useEffect } from "react";

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}