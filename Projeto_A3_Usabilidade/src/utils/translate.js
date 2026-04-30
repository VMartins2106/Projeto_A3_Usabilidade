// ─────────────────────────────────────────────
// TRADUÇÕES — NASA API → Português
// [H2] Correspondência com o mundo real
// ─────────────────────────────────────────────

// Câmeras do Rover
export const CAMERA_NAMES = {
  FHAZ: "Câmera Frontal de Risco",
  RHAZ: "Câmera Traseira de Risco",
  MAST: "Mastcam",
  CHEMCAM: "ChemCam",
  MAHLI: "Lente de Imagem da Mão",
  MARDI: "Imagem de Descida",
  NAVCAM: "Câmera de Navegação",
  PANCAM: "Câmera Panorâmica",
  MINITES: "Espectrômetro Térmico",
};

// Status dos rovers
export const ROVER_STATUS = {
  active: "Ativo",
  complete: "Missão encerrada",
};

// Tipos de mídia APOD
export const MEDIA_TYPE = {
  image: "Imagem",
  video: "Vídeo",
};

// Centros da NASA
export const NASA_CENTERS = {
  HQ: "Sede da NASA",
  JPL: "Laboratório de Propulsão a Jato",
  GSFC: "Centro de Voo Espacial Goddard",
  JSC: "Centro Espacial Johnson",
  KSC: "Centro Espacial Kennedy",
  ARC: "Centro de Pesquisa Ames",
  MSFC: "Centro de Voo Espacial Marshall",
  SSC: "Centro Espacial Stennis",
  GRC: "Centro de Pesquisa Glenn",
  AFRC: "Centro de Pesquisa Armstrong",
};

// Funções auxiliares
export function translateRoverStatus(status) {
  return ROVER_STATUS[status] || status;
}

export function translateMediaType(type) {
  return MEDIA_TYPE[type] || type;
}

export function translateCenter(center) {
  return NASA_CENTERS[center] || center;
}

export function translateCameraName(name) {
  return CAMERA_NAMES[name?.toUpperCase()] || name;
}

export function formatDatePtBR(dateStr) {
  if (!dateStr) return "";
  
  // Remove qualquer horário existente e pega só a data
  const dateOnly = dateStr.split("T")[0];
  
  return new Date(dateOnly + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}