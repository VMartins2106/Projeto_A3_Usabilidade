// ─────────────────────────────────────────────
// COMPONENTE RAIZ: App
// ─────────────────────────────────────────────
import { useState, useEffect } from "react";
import { PAGES } from "./constants/index";
import { ThemeProvider } from "./context/ThemeContext";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import SkipLink from "./components/shared/SkipLink";

import HomePage from "./pages/HomePage";
import MarsPage from "./pages/MarsPage";
import AsteroidsPage from "./pages/AsteroidsPage";

export default function App() {
  const [page, setPage] = useState(PAGES.HOME);

  const pageComponents = {
    [PAGES.HOME]: <HomePage />,
    [PAGES.MARS]: <MarsPage />,
    [PAGES.ASTEROIDS]: <AsteroidsPage />,
  };

  return (
    <ThemeProvider>
      {/* [WCAG 2.4.1] Skip link */}
      <SkipLink />

      <Header currentPage={page} />
      <NavBar current={page} onChange={setPage} />

      {/* [WCAG 2.4.1] Âncora do conteúdo principal */}
      <main
        id="main-content"
        tabIndex={-1}
        style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}
      >
        {pageComponents[page]}
      </main>

      <Footer />
    </ThemeProvider>
  );
}