import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Page from "../container/Page";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";

// Route-based code splitting — cada página se descarga solo cuando se navega a ella
const Inicio = lazy(() => import("../pages/Inicio"));
const Nosotros = lazy(() => import("../pages/Nosotros"));
const Servicios = lazy(() => import("../pages/Servicios"));
const Portafolio = lazy(() => import("../pages/Portafolio"));
const Contacto = lazy(() => import("../pages/Contacto"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AdminPanel = lazy(() => import("../pages/AdminPanel"));
const ServicioDetalle = lazy(() => import("../pages/ServicioDetalle"));

// Fallback minimalista — sin peso extra, compatible con el diseño oscuro
const PageLoader = () => (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "#080808",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9998,
  }}>
    <div style={{
      width: "2px",
      height: "40px",
      background: "rgba(255,255,255,0.25)",
      animation: "pulse 1.2s ease-in-out infinite",
    }} />
    <style>{`@keyframes pulse { 0%,100%{opacity:.2} 50%{opacity:1} }`}</style>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page />}>
            <Route index element={<PageTransition><Inicio /></PageTransition>} />
            <Route path="nosotros" element={<PageTransition><Nosotros /></PageTransition>} />
            <Route path="servicios" element={<PageTransition><Servicios /></PageTransition>} />
            <Route path="portafolio" element={<PageTransition><Portafolio /></PageTransition>} />
            <Route path="servicios/:id" element={<PageTransition><ServicioDetalle /></PageTransition>} />
            <Route path="contacto" element={<PageTransition><Contacto /></PageTransition>} />
            <Route path="*" element={<PageTransition><PageNotFound /></PageTransition>} />
          </Route>
          {/* Ruta admin fuera del layout principal (sin navbar/footer) */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
