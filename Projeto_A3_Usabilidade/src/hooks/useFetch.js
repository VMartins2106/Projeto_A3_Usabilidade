// ─────────────────────────────────────────────
// HOOK: useFetch
// [H9] Mensagens de erro humanizadas por código HTTP
// [H2] Linguagem do mundo real — sem códigos técnicos expostos

// Gerencia o ciclo de vida de uma requisição HTTP
// , incluindo estados de carregamento, sucesso e erro.

// Com o fetch aqui nós reaproveitamos a lógica de requisição 
// em toda a aplicação, mantendo os componentes limpos e focados na UI. 
// O hook lida com erros comuns de forma amigável, sem expor códigos 
// técnicos para o usuário final.

// ─────────────────────────────────────────────

import { useState, useEffect } from "react";

const HTTP_ERRORS = {
  400: "Requisição inválida. Verifique os parâmetros informados.",
  401: "Acesso não autorizado. Verifique sua chave de API.",
  403: "Acesso negado. Você não tem permissão para acessar este recurso.",
  404: "Nenhum dado encontrado para os parâmetros informados.",
  408: "O servidor demorou demais para responder. Tente novamente.",
  429: "Limite de requisições atingido. Aguarde alguns minutos ou cadastre uma chave gratuita em api.nasa.gov.",
  500: "Instabilidade na API da NASA. Tente novamente em instantes.",
  502: "Servidor intermediário fora do ar. Tente novamente em instantes.",
  503: "Serviço temporariamente indisponível. A NASA pode estar em manutenção.",
  504: "O servidor não respondeu a tempo. Tente novamente.",
};

const NETWORK_ERROR = "Sem conexão com a internet. Verifique sua rede e tente novamente.";
const UNKNOWN_ERROR = "Ocorreu um erro inesperado. Tente novamente em instantes.";

export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((res) => {
        // [H9] Mapeia código HTTP para mensagem humana
        if (!res.ok) {
          const message = HTTP_ERRORS[res.status] || `${UNKNOWN_ERROR} (código ${res.status})`;
          throw new Error(message);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) {
          // Detecta erro de rede (sem internet)
          const isNetworkError = err instanceof TypeError && err.message === "Failed to fetch";
          setState({
            data: null,
            loading: false,
            error: isNetworkError ? NETWORK_ERROR : (err.message || UNKNOWN_ERROR),
          });
        }
      });

    return () => { cancelled = true; };
  }, [url]);

  return state;
}